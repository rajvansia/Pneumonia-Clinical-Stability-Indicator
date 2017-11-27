// import axios from 'axios';
// let patients = []
// let patient =  axios.get('http://0.0.0.0:5000/patients?mock=1')
// .then(function (response) {
//   let k = 0
//   for (var i = 0; i < response.data.length; i++) {
//     k = i+1
//     let patient = axios.get("http://0.0.0.0:5000/patients/"+k+"?mock=1/")
//     .then(function (response) {
//       patients.push({id: response.data.id, days:k+1, rec:"Intravenous Antibiotics", ids:'SMART-9995679', mrn:"12345", age:response.data.birth_date, fullname:response.data.name, stability: "Clinically Not Stable", temp:Math.ceil(response.data.temperature), sys:Math.ceil(response.data.systolic_bp), dia:"77", sp:Math.ceil(response.data.pulse_ox),hr:Math.ceil(response.data.heart_rate), rr:Math.ceil(response.data.respiratory_rate)})
//
//       return patients
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//
// }
// return patients    })
// .catch(function (error) {
//   console.log(error);
// })
// let single = axios.get("http://0.0.0.0:5000/patients/"+1+"?mock=1/")
//     .then(function (response) {
//       patients.push({days:"5", rec:"Intravenous Antibiotics", ids:'SMART-9995679', mrn:"12345", age:response.data.birth_date, fullname:response.data.name, stability: "Clinically Not Stable", temp:Math.ceil(response.data.temperature), sys:Math.ceil(response.data.systolic_bp), dia:"77", sp:Math.ceil(response.data.pulse_ox),hr:Math.ceil(response.data.heart_rate), rr:Math.ceil(response.data.respiratory_rate)})
//       console.log(patients);
//
//       return patients
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

export default {
  patient:{
            status:"loading",
    // "patients": [{
    //     "type": "string",
    //     "id":0,
    //     "days":"5",
    //     "rec": "Intravenous Antibiotics",
    //     "ids":"SMART-9995679",
    //     "mrn":"1234",
    //     "age":"23",
    //     "fullname": "John Van",
    //     "stability":"Clinically Not Stable",
    //     "temp":"98",
    //     "sys": "140",
    //     "dia":"67",
    //     "sp":"95",
    //     "rr":"33",
    //     "hr":"99",
    // },
    // {
    //     "type": "string",
    //     "id":1,
    //     "days":"6",
    //     "rec": "Oral Antibiotics",
    //     "ids":"SMART-9995679",
    //     "mrn":"3321",
    //     "age":"55",
    //     "fullname": "Kim Sully",
    //     "stability":"Clinically Stable",
    //     "temp":"94",
    //     "sys": "143",
    //     "dia":"54",
    //     "sp":"98",
    //     "rr":"22",
    //     "hr":"93",
    // },
    // {
    //     "type": "string",
    //     "id":2,
    //     "days":"2",
    //     "rec": "Intravenous Antibiotics",
    //     "ids":"SMART-9995679",
    //     "mrn":"4432",
    //     "age":"32",
    //     "fullname": "Kat Kim",
    //     "stability":"Clinically Not Stable",
    //     "temp":"96",
    //     "sys": "124",
    //     "dia":"77",
    //     "sp":"99",
    //     "rr":"44",
    //     "hr":"100",
    // },
    // {
    //     "type": "string",
    //     "id":3,
    //     "days":"7",
    //     "rec": "Discharge",
    //     "ids":"SMART-9995679",
    //     "mrn":"5049",
    //     "age":"53",
    //     "fullname": "Mary Lin",
    //     "stability":"Clinically Stable",
    //     "temp":"98",
    //     "sys": "136",
    //     "dia":"80",
    //     "sp":"100",
    //     "rr":"22",
    //     "hr":"109",
    // },
    // {
    //     "type": "string",
    //     "id":4,
    //     "days":"1",
    //     "rec": "Intravenous Antibiotics",
    //     "ids":"SMART-9995679",
    //     "mrn":"1234132",
    //     "age":"23",
    //     "fullname": "Sam Paul",
    //     "stability":"Clinically Not Stable",
    //     "temp":"97",
    //     "sys": "180",
    //     "dia":"80",
    //     "sp":"93",
    //     "rr":"33",
    //     "hr":"122",
    // }],
    // patientDet:{days:"5", rec:"Intravenous Antibiotics", id:'SMART-9995679', mrn:"12345", age:"44", fullname:"John Van", stability: "Clinically Not Stable", temp:'98', sys:"140", dia:"77", sp:"95", rr:"22"}
}
};
