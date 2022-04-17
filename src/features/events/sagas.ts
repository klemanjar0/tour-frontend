import { all, takeLatest, select, put, call } from 'redux-saga/effects';
import {
  createEventFailed,
  createEventRequest,
  createEventSuccess,
  myEventFailed,
  myEventRequest,
  myEventSuccess,
  setMaxEventPrize,
} from './slice';
import { RootState } from '../store';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import { buildEventsJson, transformEvents } from './utils';
import { IEvent } from './types';
import { updateEventsSyncActionTime } from '../syncConnector/slice';

export function* fetchMyEventsSaga(): any {
  try {
    const state: RootState = yield select();
    const json = buildEventsJson();

    const response = yield call(
      callApi,
      ENDPOINT.MY_EVENTS,
      buildHeaders(state, json),
    );
    const transformed = transformEvents(response);
    yield call(fetchMaxPrizeFund);
    yield put(myEventSuccess(transformed));
  } catch (e: any) {
    yield put(myEventFailed(e.message as string));
  }
}

export function* fetchMaxPrizeFund(): any {
  try {
    const state: RootState = yield select();
    const response = yield call(
      callApi,
      ENDPOINT.MAX_EVENTS_PRIZE_FUND,
      buildHeaders(state, {}),
    );
    yield put(setMaxEventPrize(response));
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
