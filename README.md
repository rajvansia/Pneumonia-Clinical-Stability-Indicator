# Community-Acquired-Pneumonia-Clinical-Stability-Indicator

Community Acquired Pneumonia Clinical Stability Indicator #15

## Architecture

The *backend* talks to the FHIR server and encapsulates the logic for identifying relevant patients and resources. For each patient, the data are passed into the *model* which applies the expert rules to determine if a CAP patient is "clinically stable". The result of this is augmented onto the data payload and then sent to *frontend* which renders the information.

## Backend

### Logic

Inclusion criteria for CAP patients:

- Has one of:
  - SNOMED CT: 385093006
- Clinically active
- Patient active (not deceased)

### Data

Query for all CAP patients:

- patient id
- onset/admission date

Query for patient details:

- patient id
- onset/admission date
- vital signs
  - last 24 hours
  - includes
    - [systolic blood pressure](https://www.hl7.org/fhir/observation-example-bloodpressure.html)
        - LOINC: 8480-6
        - `/Observation?component-code=8480-6`
          - *Component of blood pressure*
    - [heart rate](https://www.hl7.org/fhir/observation-example-heart-rate.html)
        - LOINC: 8867-4
        - `/Observation?code=8867-4`
    - [respiratory rate](https://www.hl7.org/fhir/observation-example-respiratory-rate.html)
        - LOINC: 9279-1
        - `/Observation?code=9279-1`
    - [temperature](https://www.hl7.org/fhir/observation-example-body-temperature.html)
        - LOINC: 8310-5
        - `/Observation?code=8310-5`
    - [pulse ox](https://www.hl7.org/fhir/observation-example-satO2.html)
        - LOINC: 59408-5
        - `/Observation?code=59408-5`
- ability to eat
  - last 24 hours
  - TODO
- mental status
  - last 24 hours
  - TODO

## Model

TODO

## Frontend

The frontend uses React to create reusable UI components. The frontend will retrive patient data such as vital signs and CAP recomendation from the backend. With this data it will pass into React UI components.  Utalizing React makes it easier to update state of the application to seamlessly update the UI components when new vitals/recommendation data comes in. 
