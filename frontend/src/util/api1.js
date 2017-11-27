import customData from './data.json';
import axios from 'axios';
export const fhirApi = {

    getPatientName(id) {
      console.log(customData.patient.patients.patient[id])
      let patientS = customData.patient.patients.patient[id]
      let patient = {days:"ij", rec:"Intravenous Antibiotics", id:'SMART-9995679', mrn:"12345", age:"44", fullname:"Lin Van", stability: "Clinically Not Stable", temp:'98', sys:"140", dia:"77", sp:"95", rr:"22"}
      return patient
    },
    getPatientData(id) {

      let patients = axios.get('http://0.0.0.0:5000/patients?mock=1')
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].name);
}
      })
      .catch(function (error) {
        console.log(error);
      });




      let patient = axios.get('http://0.0.0.0:5000/patients/2?mock=1')
      .then(function (response) {
        console.log(response.data);
        let patient = {days:"5", rec:"Intravenous Antibiotics", ids:'SMART-9995679', mrn:"12345", age:response.data.birth_date, fullname:response.data.name, stability: "Clinically Not Stable", temp:Math.ceil(response.data.temperature), sys:Math.ceil(response.data.systolic_bp), dia:"77", sp:Math.ceil(response.data.pulse_ox),hr:Math.ceil(response.data.heart_rate), rr:Math.ceil(response.data.respiratory_rate)}

        return patient
      })
      .catch(function (error) {
        console.log(error);
      });
      return patient
    }

  }
  <PatientDem id={s.id} days={s.days} hr={s.hr} rec={s.rec} mrn={s.mrn} age={s.age} fullname={s.fullname} stability={s.stability}  rr={s.rr} temp={s.temp} sp={s.sp} dia={s.dia} sys={s.sys}/>
