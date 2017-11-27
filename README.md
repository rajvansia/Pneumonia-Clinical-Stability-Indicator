# Community-Acquired-Pneumonia-Clinical-Stability-Indicator

Project #15

## Demo

This will fetch Docker images in the frontend/ and backend/ directories and takes a few minutes.

```
docker-compose up
```

The public ports are in the `docker-compose.yml` including `5839` for the backend and `5931` for the frontend. If the backend port needs to change, an additional file needs to change in the frontend prior to building the containers (since it depends on the URL from the browser). Edit the port listed in frontend/src/

### Test Patients

- Amy Shaw - http://localhost:5839/patients/np-2
  - Condition: SNOMED-CT 233604007
  - Status: active
  - Length of stay: 4 days
  - Clinically stable: No
    - respiratory rate > 24

- Jon Doe - http://localhost:5839/patients/np-2
  - Condition: SNOMED-CT 385093006
  - Status: active
  - Length of stay: 1 day
  - Clinically stable: No
      - temperature > 37.7
      - heart rate > 100
      - respiratory rate > 24

- Robert Smith - http://localhost:5839/patients/np-3
  - Condition: ICD-10 J18.9
  - Status: active
  - Length of say: 5 days
  - Clinically stable: Yes

- Dana Lee - http://localhost:5839/patients/np-4
  - Condition: ICD-10 J18.0
  - Status: resolved
  - Clinically stable: Yes

- Harper Miller - http://localhost:5839/patients/np-5
  - Condition: No match (control)

## Usage

- Go to http://localhost:5931 in your browser to view the frontend.
- View an API endpoint by going to http://localhost:5839/patients.
- View the FHIR server frontend by going to http://localhost:8080

## Architecture

## Backend

The *backend* talks to the FHIR server and encapsulates the logic for identifying relevant patients and resources. For each patient, the data are passed into the *model* which applies the expert rules to determine if a CAP patient is "clinically stable". The result of this is augmented onto the data payload and then sent to *frontend* which renders the information.

## Model

The model has been implemented on the backend. Accessing a specific patient's detail page will compute the stability of the patient based on the last 24 hours of vital sign data.

## Frontend

The frontend uses React to create reusable UI components. The frontend will retrive patient data such as vital signs and CAP recomendation from the backend. With this data it will pass into React UI components.  Utalizing React makes it easier to update state of the application to seamlessly update the UI components when new vitals/recommendation data comes in.
