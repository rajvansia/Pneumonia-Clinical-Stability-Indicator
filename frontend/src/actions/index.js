
export const PATIENT_DELETED = 'PATIENT_DELETED';
export function patientDeleted(patient){
  return{
    type: PATIENT_DELETED,
    patient
  }
}
export const PATIENTDELETE = 'PATIENTDELETE';
export function deletePatient(patient){
  return{
type: PATIENTDELETE,
patient
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
