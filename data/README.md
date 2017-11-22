# FHIR Data

To import the FHIR data, clone the `tag-uploader` repository and install the Node dependencies.

```
git clone https://github.com/smart-on-fhir/tag-uploader
cd tag-uploader
npm install
```

Ensure the FHIR server is running, then run the command in the `tag-uploader` directory to import the patient bundles.

```
node . -v -d ../bundles -S http://localhost:8080/baseDstu3
```
