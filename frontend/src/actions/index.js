export const BLOOD = 'BLOOD';
export function blood(id){
  return{
type: BLOOD,
id
  }
}


export const PATIENTUPDATE = 'PATIENTUPDATE';
export function updatePatient(patient){
  return{
type: PATIENTUPDATE,
patient
  }
}
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export function updatePatientInfo(patient){
  return{
type: UPDATE_PATIENT,
patient
  }
}

export const PATIENT_SELECTED = 'PATIENT_SELECTED';
export function patientSelected(patient){
  return{
    type: PATIENT_SELECTED,
    patient
  }
}
