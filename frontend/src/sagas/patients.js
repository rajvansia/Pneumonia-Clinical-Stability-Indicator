import {takeEvery, takeLatest} from 'redux-saga/effects'
import { put, call,all } from 'redux-saga/effects'
import* as actions from '../actions'
import {fhirapi, fhirapiDet} from '../util/api.js'
import {browserHistory} from 'react-router'
import {pic, url, y} from '../actions/index.js';
const PATIENTUPDATE = 'PATIENTUPDATE';

export default function* updatePatient({ payload }) {
  try {
    const fhir = yield call(fhirapi, payload);
    let y = []
    for (var i = 0; i < fhir.length; i++) {
    const fhirs = yield call(fhirapiDet, fhir[i].id)
      // console.log(fhirs);
      y.push(fhirs)
    }
    console.log(y);

    yield [
      put({type:PATIENTUPDATE, y}),
    ];
  } catch (error) {

  }
}

//
//
// export default function* userSaga(){
//
//   yield* takeLatest(actions.PATIENT_SELECTED, updatePatient);
// }
