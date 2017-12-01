# Special Instructions

### Using Docker
To run the application, [Docker](https://docs.docker.com/engine/installation/#supported-platforms) and [Docker Compose](https://docs.docker.com/compose/install/) are required. The versions tested against during development were Docker 17.09.0 and Docker Compose 1.16.1, however most recent versions should work properly.

Assuming proper installation and the Docker daemon is running, the application can be launched using the following command from the current "Final Delivery" directory where the `docker-compose.yml` file is located. If you are in the project root, a copy of the file will be there as well.

```
docker-compose up
```

On first run, this will pull four images from Docker Hub which may take several minutes depending on your Internet connection speed.

Once the images are pulled, four containers will be launched. The logs of each container will be printed to the console. The container running the FHIR server takes the longest to bootstrap due to it being a Java Web application. The FHIR server is ready once you see a log statement like the following (but with a different date and startup time).

```
fhir_1      | 2017-11-29 20:11:28.935:INFO:oejs.Server:main: Started @26840ms
```

At this point you can now navigate to the frontend by going to the Web address http://localhost:5931 in your browser of choice.


### Creating New Patient Data
If new patient data is desired, it can be created by utlizing the "gen.py" python script in the data_gen folder. To run script, run the following command:
```
python gen.py {patient_name}
```
This will generate a csv titled {patient_name}.csv in the data_gen folder.

To add data to FHIR server, copy the csv data to a new json bundle file. An existing bundle file can be copied from the ./data/bundles file. Make sure to change the patient ID in the json file to match the ID of the new patient and also to udpate the URL based on the patient ID. Then change each "value" for each "unit" to match the csv file that was generated.

To upload the new json to the FHIR server, clone the `tag-uploader` repository and install the Node dependencies.

```
git clone https://github.com/smart-on-fhir/tag-uploader
cd tag-uploader
npm install
```

Ensure the FHIR server is running, then run the command in the `tag-uploader` directory to import the patient bundles.

```
node . -v -d ../bundles -S http://localhost:8080/baseDstu3
```
