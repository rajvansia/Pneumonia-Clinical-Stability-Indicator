import { takeLatest, takeEvery } from 'redux-saga';
import {updatePatient} from './patients';
import {deletePatient} from './patients';
import* as actions from '../actions'

// export default function* userSaga() {
//   yield* takeLatest(actions.PATIENT_DELETED, deletePatient);
//   yield* takeLatest(actions.PATIENT_SELECTED, updatePatient);
//
// }
export default function* userSaga(){
  yield takeEvery(actions.PATIENT_SELECTED, updatePatient);
};
