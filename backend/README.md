# Backend

## Install

Tested on Python 3.4+

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

### Docker

Build the image.

```
docker built -t nopressure/backend .
```

Run a container.

```
docker run --rm -it -p 5000:5000 nopressure/backend
```

## Endpoints

- `/patients` - Get a list of all patients with Pneumonia.
- `/patients/<id>` - Get the staibility, vital signs, mental, and eating status for a patient.

Add `?mock=1` to the URL to get the built-in mock patients.
