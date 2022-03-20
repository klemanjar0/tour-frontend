import { all, takeLatest, select, put, call } from 'redux-saga/effects';
import { myEventFailed, myEventRequest, myEventSuccess } from './slice';
import { RootState } from '../store';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import { transformEvents } from './utils';

export function* fetchMyEventsSaga(): any {
  try {
    const state: RootState = yield select();
    const json = {
      start: 0,
      limit: -1,
    };
    const response = yield call(
      callApi,
      ENDPOINT.MY_EVENTS,
      buildHeaders(state, json),
    );
    const transformed = transformEvents(response);
    yield put(myEventSuccess(transformed));
  } catch (e: any) {
    yield put(myEventFailed(e.message as string));
  }
}

export default function* root() {
  yield all([takeLatest(myEventRequest, fetchMyEventsSaga)]);
}
