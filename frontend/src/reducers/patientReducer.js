import initialState from './initialState';
import {PATIENT_SELECTED,UPDATE_PATIENT, PATIENTUPDATE, PATIENTDELETE} from '../actions/index.js';


export default function (state = initialState.patient, action) {
  // get the action varible for the data you want to update with
  const { patientDet,patient, fhir} = action

  switch (action.type) {
    case PATIENTUPDATE:
        console.log("MRN")
        //update the patientDet state based on the new infromation from the api call
        return { ...state, patients: fhir };
    case PATIENTDELETE:
let deletedPatients = [...state.patients]
for(var i = deletedPatients.length - 1; i >= 0; i--) {
    if(deletedPatients[i].id === patient) {
       deletedPatients.splice(i,1);
    }
}
console.log(deletedPatients);
            //update the patientDet state based on the new infromation from the api call
        return { ...state, patients: deletedPatients}
    default:
      return { ...state };
  }
}
