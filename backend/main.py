import os
import json
from datetime import datetime, timedelta
from collections import defaultdict
from flask import Flask, jsonify
from flask_cors import CORS
from fhirclient.client import FHIRClient
from fhirclient.models.observation import Observation
from fhirclient.models.patient import Patient
from fhirclient.models.condition import Condition

GATECH_FHIR_API_URL = 'http://fhirtesting.hdap.gatech.edu/hapi-fhir-jpaserver-example/baseDstu3'
FHIR_TEST_API_URL = 'http://fhirtest.uhn.ca/baseDstu3'

FHIR_API_URL = os.environ.get('FHIR_API_URL', FHIR_TEST_API_URL)
APP_ID = 'team_no_pressure'

# Client to FHIR server.
fhir = FHIRClient(settings={
    'app_id': APP_ID,
    'api_base': FHIR_API_URL,
})


# Web server and resources. All logic is separate. The handlers
# simply translate the data and/or exceptions into the appropriate
# HTTP response.
app = Flask(__name__)
CORS(app)


@app.route('/patients')
def handle_get_patient_list():
    return jsonify(get_patient_list(fhir))


@app.route('/patients/<pat_id>')
def handle_get_patient_detail(pat_id):
    return jsonify(get_patient_detail(fhir, pat_id))


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

LOINC_SYSTEM = 'http://loinc.org'

LOINC_BP = '55284-4'
LOINC_SBP = '8480-6'
LOINC_HR = '8867-4'
LOINC_RR = '9279-1'
LOINC_TEMP = '8310-5'
LOINC_O2 = '59408-5'


def parse_human_name(name):
    """ Formats a `HumanName` instance into a string.
    """
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

    # Implicitly fetches pages on demand.
    for r in search.perform_resources(fhir.server):
        if r.resource_type == 'Condition':
            c = r.code.coding[0]

            conditions[r.subject.reference].append({
                'onset': r.onsetDateTime.isostring,
                'code': c.code,
                'system': c.system,
                'display': c.display,
            })

        elif r.resource_type == 'Patient':
            ref = 'Patient/' + r.id

            patients.append({
                'id': r.id,
                'name': parse_human_name(r.name[0]),
                'birth_date': r.birthDate.isostring,
                'gender': r.gender,
                'conditions': conditions[ref],
            })

    return patients


# Get a single patient by id including admission date and the last 24 hours
# of their vitals, eating and mental status.
def get_patient_detail(fhir, pat_id):
    pat = Patient.read(pat_id, fhir.server)

    # Only the last 24 hours are considered.
    past24 = datetime.now() - timedelta(days=1)

    # Vital signs for the patient. Includes SBP, HR, RR, satO2, temp
    search = Observation.where(struct={
        'subject': pat_id,
        'category': 'vital-signs',
        'date': {
            '$gte': past24.strftime('%Y-%m-%dT%H:%M:%S'),
        },
    })

    sbp = []
    hr = []
    rr = []
    temp = []
    o2 = []

    # Implicitly fetches pages on demand.
    for r in search.perform_resources(fhir.server):
        # Resource code.
        system = r.code.coding.system
        code = r.code.coding.code

        if system != LOINC_SYSTEM:
            continue

        # Extract systolic component from blood pressure.
        if code == LOINC_BP:
            for c in r.component:
                if c.code.coding.code  == LOINC_SBP:
                    sbp.append({
                        'time': r.effectiveDateTime,
                        'value': c.valueQuantity.value,
                        'unit': c.valueQuantity.unit,
                    })
                    break

        elif code == LOINC_HR:
            hr.append({
                'time': r.effectiveDateTime,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

        elif code == LOINC_RR:
            rr.append({
                'time': r.effectiveDateTime,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

        elif code == LOINC_TEMP:
            temp.append({
                'time': r.effectiveDateTime,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

        elif code == LOINC_O2:
            os2.append({
                'time': r.effectiveDateTime,
                'value': r.valueQuantity.value,
                'unit': r.valueQuantity.unit,
            })

    return {
        'id': pat_id,
        'name': parse_human_name(pat.name[0]),
        'birth_date': pat.birthDate.isostring,
        'gender': pat.gender,
        'heart_rate': hr,
        'respiratory_rate': rr,
        'temperature': temp,
        'pulse_ox': o2,
        'systolic_bp': sbp,
        'mental_status': None,
        'eating_status': None,
    }


if __name__ == '__main__':
    DEBUG = int(os.environ.get('DEBUG', 0))
    HTTP_PORT = int(os.environ.get('PORT', 5000))
    HTTP_HOST = os.environ.get('HOST', '127.0.0.1')

    app.run(host=HTTP_HOST, port=HTTP_PORT, debug=DEBUG)
