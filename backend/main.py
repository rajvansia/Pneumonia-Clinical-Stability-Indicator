import os
import json
from datetime import datetime, timedelta
from collections import defaultdict
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from fhirclient.client import FHIRClient
from fhirclient.models.observation import Observation
from fhirclient.models.patient import Patient
from fhirclient.models.condition import Condition


# Reference date to pin queries to. Since calculations are
# based on a 24-hour sliding window, this is required for
# static data, i.e. a non-live system where new observations
# are *not* being recorded.
REF_DATE = os.environ.get('FHIR_REF_DATE')
if REF_DATE:
    REF_DATE = datetime.strptime(REF_DATE, '%Y-%m-%d')


# FHIR server env variable required.
FHIR_API_URL = os.environ['FHIR_API_URL']


PNEUMONIA_CODES = (
    # SNOMED CT: Pneumonia (general)
    '233604007',

    # SNOMED CT: Community-acquired pneumonia
    '385093006',

    # ICD-10-CM
    'J18.9',
    'J18',
    'J18.0',
    'J15.1',
)

MEDICATIONS_RXNORM = (
    ## fluoroquinolones: https://en.wikipedia.org/wiki/Quinolone_antibiotic#Generations
    # ciprofloxacin
    '2551',
    # levofloxacin
    '82122',
    # moxifloxacin
    '139462',
    # gemifloxacin
    '138099',
    # norfloxacin
    '7517',
    # ofloxacin
    '7623',

    ## macrolide: https://en.wikipedia.org/wiki/Macrolide#Antibiotic_macrolides
    # azithromycin
    '18631',
    # clarithromycin
    '21212',
    # erythromycin
    '4053',
    # fidaxomicin
    '1111103',
    # telithromycin
    '274786',

    # doxycycline
    '3640',
)

LOINC_SYSTEM = 'http://loinc.org'

LOINC_BP = '55284-4'
LOINC_SBP = '8480-6'
LOINC_DBP = '8462-4'
LOINC_HR = '8867-4'
LOINC_RR = '9279-1'
LOINC_TEMP = '8310-5'
LOINC_O2 = '59408-5'

VITAL_SIGNS_CATEGORY = 'vital-signs'


def avg(vals):
    if not vals:
        return
    return sum(vals) / len(vals)


# Taken and modified from the FHIR python client.
def parse_human_name(name):
    "Formats a `HumanName` instance into a string."
    if name is None:
        return

    parts = []
    for n in [name.prefix, name.given]:
        if n is not None:
            parts.extend(n)

    if name.family:
        parts.append(name.family)

    if name.suffix and len(name.suffix) > 0:
        if len(parts) > 0:
            parts[len(parts)-1] = parts[len(parts)-1]+','
        parts.extend(name.suffix)

    return ' '.join(parts) if len(parts) > 0 else None


# Compute the status of the patient by averaging the available
# observation values for each relevant type. The averaged value
# is returned along with the 'stable' characterization as Yes,
# No, or Maybe. Maybe is used when it is not *No* and there is
# missing data.
def compute_status(measures):
    evidence = {
        'heart_rate': None,
        'respiratory_rate': None,
        'temperature': None,
        'pulse_ox': None,
        'systolic_bp': None,
        'diastolic_bp': None,
        'mental_status': None,
        'eating_status': None,
    }

    stable = 'Yes'
    indicator = []

    if measures['heart_rate']:
        val = avg([x['value'] for x in measures['heart_rate']])
        evidence['heart_rate'] = val
        if val > 100:
            stable = 'No'
            indicator.append('heart rate > 100')
    else:
        stable = 'Maybe'

    if measures['respiratory_rate']:
        val = avg([x['value'] for x in measures['respiratory_rate']])
        evidence['respiratory_rate'] = val
        if val > 24:
            stable = 'No'
            indicator.append('respiratory rate > 24')
    else:
        stable = 'Maybe'

    if measures['temperature']:
        val = avg([x['value'] for x in measures['temperature']])
        evidence['temperature'] = val
        if val > 37.7:
            stable = 'No'
            indicator.append('temperature > 37.7')
    else:
        stable = 'Maybe'

    if measures['pulse_ox']:
        val = avg([x['value'] for x in measures['pulse_ox']])
        evidence['pulse_ox'] = val
        if val < 90:
            stable = 'No'
            indicator.append('pulse ox < 90')
    else:
        stable = 'Maybe'

    if measures['blood_pressure']:
        sval = []
        dval = []
        for bp in measures['blood_pressure']:
            if bp['systolic']:
                sval.append(bp['systolic']['value'])
            if bp['diastolic']:
                dval.append(bp['diastolic']['value'])

        sval = avg(sval)
        dval = avg(dval)

        evidence['systolic_bp'] = sval
        evidence['diastolic_bp'] = dval

        if val < 90:
            stable = 'No'
            indicator.append('systolic bp < 90')
    else:
        stable = 'Maybe'

    evidence['stable'] = stable
    evidence['indicators'] = indicator

    return evidence


# Get the full set of patients with CAP who have not been discharged.
# Included is the patient id and the admission date.
def get_patient_list(fhir):
    search = Condition.where(struct={
        'clinical-status': 'active',
        'code': {
            '$or': list(PNEUMONIA_CODES),
        },
        'subject.active': 'true',
        '_include': 'Condition:subject',
    })

    # Index of conditions by patient reference.
    conditions = defaultdict(list)
    patients = []
    onset_dates = {}

    # Implicitly fetches pages on demand.
    for r in search.perform_resources(fhir.server):
        if r.resource_type == 'Condition':
            ref = r.subject.reference

            c = r.code.coding[0]

            if ref not in onset_dates or r.onsetDateTime.date < onset_dates[ref]:
                onset_dates[ref] = r.onsetDateTime

            conditions[ref].append({
                'onset': r.onsetDateTime.isostring,
                'code': c.code,
                'system': c.system,
                'display': c.display,
            })

        elif r.resource_type == 'Patient':
            ref = 'Patient/' + r.id

            if REF_DATE:
                ref_date = REF_DATE
            else:
                ref_date = datetime.now()

            p = get_patient_detail(fhir, r.id)
            p['conditions'] = conditions[ref]
            p['length_of_stay'] = (ref_date.date() - onset_dates[ref].date).days
            m = p.pop('measures')
            p['status'] = compute_status(m)
            patients.append(p)

            # Reset.
            min_onset_date = None

    return patients


# Get a single patient by id including admission date and the last 24 hours
# of their vitals, eating and mental status.
def get_patient_detail(fhir, pat_id):
    pat = Patient.read(pat_id, fhir.server)

    # If set, use this to query on a fixed time point.
    if REF_DATE:
        ref_date = REF_DATE
    else:
        ref_date = datetime.now()

    # Only the last 24 hours are considered.
    past24 = ref_date - timedelta(days=1)

    # Vital signs for the patient. Includes SBP, HR, RR, satO2, temp
    search = Observation.where(struct={
        'subject': pat_id,
        'category': VITAL_SIGNS_CATEGORY,
        'date': {
            '$gte': past24.strftime('%Y-%m-%dT%H:%M:%SZ'),
        },
    })

    bp = []
    hr = []
    rr = []
    temp = []
    o2 = []

    # Implicitly fetches pages on demand.
    for r in search.perform_resources(fhir.server):
        # Resource code.
        system = r.code.coding[0].system
        code = r.code.coding[0].code

        if system != LOINC_SYSTEM:
            continue

        # Extract systolic component from blood pressure.
        if code == LOINC_BP:
            sbp = None
            dbp = None

            for c in r.component:
                if c.code.coding[0].code == LOINC_SBP:
                    sbp = {
                        'time': r.effectiveDateTime.isostring,
                        'value': c.valueQuantity.value,
                        'unit': c.valueQuantity.unit,
                    }
                elif c.code.coding[0].code == LOINC_DBP:
                    dbp = {
                        'time': r.effectiveDateTime.isostring,
                        'value': c.valueQuantity.value,
                        'unit': c.valueQuantity.unit,
                    }

            if sbp or dbp:
                bp.append({
                    'systolic': sbp,
                    'diastolic': dbp,
                })

        elif code == LOINC_HR:
            hr.append({
                'time': r.effectiveDateTime.isostring,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

        elif code == LOINC_RR:
            rr.append({
                'time': r.effectiveDateTime.isostring,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

        elif code == LOINC_TEMP:
            temp.append({
                'time': r.effectiveDateTime.isostring,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

        elif code == LOINC_O2:
            o2.append({
                'time': r.effectiveDateTime.isostring,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

    mrn = None
    if pat.identifier:
        mrn = pat.identifier[0].value

    return {
        'id': pat_id,
        'mrn': mrn,
        'name': parse_human_name(pat.name[0]),
        'birth_date': pat.birthDate.isostring,
        'gender': pat.gender,
        'measures': {
            'heart_rate': hr,
            'respiratory_rate': rr,
            'temperature': temp,
            'pulse_ox': o2,
            'blood_pressure': bp,
            'mental_status': None,
            'eating_status': None,
        },
    }


# Client to FHIR server.
fhir = FHIRClient(settings={
    'app_id': 'team_no_pressure',
    'api_base': FHIR_API_URL,
})


# Web server and resources. All logic is separate. The handlers
# simply translate the data and/or exceptions into the appropriate
# HTTP response.
app = Flask(__name__)
CORS(app)


# Get a list of patients that have pneumonia and are active.
@app.route('/patients')
def handle_get_patient_list():
    return jsonify(get_patient_list(fhir))


# Get the detail of patient by ID.
@app.route('/patients/<pat_id>')
def handle_get_patient_detail(pat_id):
    p = get_patient_detail(fhir, pat_id)

    if p is None:
        abort(404)

    p['status'] = compute_status(p['measures'])
    return jsonify(p)


if __name__ == '__main__':
    DEBUG = int(os.environ.get('DEBUG', 0))
    HTTP_PORT = int(os.environ.get('PORT', 5000))
    HTTP_HOST = os.environ.get('HOST', '127.0.0.1')

    app.run(host=HTTP_HOST, port=HTTP_PORT, debug=DEBUG)
