import { fork } from 'redux-saga/effects';
import userSaga from './watchers';

export default function* startForman() {
  yield fork(userSaga);
}
