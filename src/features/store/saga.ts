import authSaga from '../auth/sagas';
import eventsSaga from '../events/sagas';
import { all, fork } from 'redux-saga/effects';
import { watchSocket } from '../socket/sagas';

export default function* sagas() {
  yield all([fork(authSaga), fork(eventsSaga), fork(watchSocket)]);
}
