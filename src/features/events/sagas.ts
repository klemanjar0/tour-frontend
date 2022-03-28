import { all, takeLatest, select, put, call } from 'redux-saga/effects';
import {
  createEventFailed,
  createEventRequest,
  createEventSuccess,
  myEventFailed,
  myEventRequest,
  myEventSuccess,
} from './slice';
import { RootState } from '../store';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import { transformEvents } from './utils';
import { IEvent } from './types';
import { updateEventsSyncActionTime } from "../syncConnector/slice";

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

export function* createEventSaga({
  payload,
}: {
  payload: Partial<IEvent>;
}): any {
  try {
    const state: RootState = yield select();
    yield call(callApi, ENDPOINT.CREATE_EVENT, buildHeaders(state, payload));
    yield put(createEventSuccess());
    yield put(updateEventsSyncActionTime(Date.now()));
  } catch (e: any) {
    yield put(createEventFailed(e.message as string));
  }
}

export default function* root() {
  yield all([
    takeLatest(myEventRequest, fetchMyEventsSaga),
    takeLatest(createEventRequest, createEventSaga),
  ]);
}
