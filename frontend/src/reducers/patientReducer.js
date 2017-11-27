import initialState from './initialState';
import {PATIENT_SELECTED,UPDATE_PATIENT, PATIENTUPDATE} from '../actions/index.js';


export default function (state = initialState.patient, action) {
  // get the action varible for the data you want to update with
  const { patientDet,patient, y} = action

  switch (action.type) {
    case PATIENTUPDATE:
        console.log("MRN")
        //update the patientDet state based on the new infromation from the api call
        return { ...state, patients: y };
    default:
      return { ...state };
  }
}
