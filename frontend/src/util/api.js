import customData from './data.json';
import axios from 'axios';

export const fhirapi = () => {
  const FHIR= `http://0.0.0.0:5000/patients?mock=1`;
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







export const fhirApis = {

    getPatientName(id) {
      console.log(customData.patient.patients.patient[id])
      let patientS = customData.patient.patients.patient[id]
      let patient = {days:"ij", rec:"Intravenous Antibiotics", id:'SMART-9995679', mrn:"12345", age:"44", fullname:"Lin Van", stability: "Clinically Not Stable", temp:'98', sys:"140", dia:"77", sp:"95", rr:"22"}
      return patient
    },
  async getPatients() {
      let patients = []
      let patient = await axios.get('http://0.0.0.0:5000/patients?mock=1')
      .then(function (response) {
        let k = 0
        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].name)
          k = i+1
          let patient = axios.get("http://0.0.0.0:5000/patients/"+k+"?mock=1/")
          .then(function (response) {
            patients.push({id: response.data.id, days:"5", rec:"Intravenous Antibiotics", ids:'SMART-9995679', mrn:"12345", age:response.data.birth_date, fullname:response.data.name, stability: "Clinically Not Stable", temp:Math.ceil(response.data.temperature), sys:Math.ceil(response.data.systolic_bp), dia:"77", sp:Math.ceil(response.data.pulse_ox),hr:Math.ceil(response.data.heart_rate), rr:Math.ceil(response.data.respiratory_rate)})
            console.log(patients);

            return patients
          })
          .catch(function (error) {
            console.log(error);
          });

}
      return patients    })
      .catch(function (error) {
        console.log(error);
      });
      return patients
    },
    getPatientData(id) {
      let patients = []
      let patient = axios.get('http://0.0.0.0:5000/patients?mock=1')
      .then(function (response) {
        let k = 0
        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].name)
          k = i+1
          let patient = axios.get("http://0.0.0.0:5000/patients/"+k+"?mock=1/")
          .then(function (response) {
            console.log(response.data);
            let patients = patients.push({days:"5", rec:"Intravenous Antibiotics", ids:'SMART-9995679', mrn:"12345", age:response.data.birth_date, fullname:response.data.name, stability: "Clinically Not Stable", temp:Math.ceil(response.data.temperature), sys:Math.ceil(response.data.systolic_bp), dia:"77", sp:Math.ceil(response.data.pulse_ox),hr:Math.ceil(response.data.heart_rate), rr:Math.ceil(response.data.respiratory_rate)})

            return patient
          })
          .catch(function (error) {
            console.log(error);
          });

  }
      return patient    })
      .catch(function (error) {
        console.log(error);
      });
      return patient
    }
  }
