# Backend

## Install

Testes on Python 3.4+

```
pip install -r requirements.txt
```

## Run

```
python main.py
```

Environment variables:

- `HOST` - Host to listen on. Use 0.0.0.0 for all interfaces. (default `127.0.0.1`)
- `PORT` - Port to bind to. (default `5000`)
- `DEBUG` - Set to 1 for debug mode. (default `0`)
- `FHIR_API_URL` - URL to a FHIR server. (default `http://fhirtest.uhn.ca/baseDstu3`)

Use them by setting them inline:

```
DEBUG=1 PORT=6000 python main.py
```

## Endpoints

- `/patients` - Get a list of all patients with Pneumonia.
- `/patients/<id>` - Get vital signs, mental, and eating status for a patient.
