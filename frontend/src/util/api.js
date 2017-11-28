import axios from 'axios';

export const fhirapi = () => {
  const FHIR= `http://127.0.0.1:5839/patients`;
  return fetch(FHIR)
  .then(response => {
    return response.json();
  })
  .then(json => {
    return json
  });


};

export const fhirapiDet = (id) => {
  const FHIRDET= "http://0.0.0.0:5000/patients/"+id+"?mock=1";
  return fetch(FHIRDET)
  .then(response => {
    return response.json();
  })
  .then(json => {
    // console.log(json);
    return json
  });


};
