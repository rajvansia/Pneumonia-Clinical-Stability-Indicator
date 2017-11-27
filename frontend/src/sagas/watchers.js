import { takeLatest } from 'redux-saga';
import updatePatient from './patients';
import* as actions from '../actions'

export default function* userSaga() {
  yield* takeLatest(actions.PATIENT_SELECTED, updatePatient);
}
