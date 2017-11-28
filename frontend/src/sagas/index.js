import { fork, takeEvery } from 'redux-saga/effects';
import userSaga from './watchers';
import {deletePatient} from './patients';
import* as actions from '../actions'


export default function* startForman() {
  yield fork(userSaga);
  yield takeEvery(actions.PATIENT_DELETED, deletePatient);

}
