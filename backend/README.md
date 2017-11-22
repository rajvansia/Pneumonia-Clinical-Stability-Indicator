# Backend

The backend to the CAP CDS project. The directions below should be used for development and/or production deployments. For the demo, refer to the top-level README.

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

- `HOST` - Host to listen on. Use `0.0.0.0` for all interfaces. (default `127.0.0.1`)
- `PORT` - Port to bind to. (default `5000`)
- `DEBUG` - Set to 1 for debug mode. (default `0`)
- `FHIR_API_URL` - URL to a FHIR server.
- `FHIR_REF_DATE` - Fixed reference time for queries. If not set, every request will query relative to the current server time. In other words, this should *only* be set if the FHIR server does not contain live data.

Variables can be set inline to executing the program:

```
DEBUG=1 PORT=6000 python main.py
```

## Endpoints

- `/patients` - Get a list of all patients with Pneumonia.
- `/patients/<id>` - Get details about a patient in the system and their CAP-related info.
