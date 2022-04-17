import { all, takeLatest, select, put, call } from 'redux-saga/effects';
import {
  createEventFailed,
  createEventRequest,
  createEventSuccess,
  fetchEventUsersFailed,
  fetchEventUsersRequest,
  fetchEventUsersSuccess,
  fetchUsernamesFailed,
  fetchUsernamesRequest,
  fetchUsernamesSuccess,
  inviteUserRequest,
  inviteUserSuccess,
  myEventFailed,
  myEventRequest,
  myEventSuccess,
  setMaxEventPrize,
} from './slice';
import { RootState } from '../store';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import { buildEventsJson, transformEvents, transformUsers } from './utils';
import { IEvent } from './types';
import { updateEventsSyncActionTime } from '../syncConnector/slice';
import { pushNotification } from '../notifications/slice';
import { notifications } from '../constants';

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

export function* fetchUsernamesSaga({ payload }: { payload: string }): any {
  try {
    const state: RootState = yield select();
    const data = {
      query: payload,
    };
    const usernames = yield call(
      callApi,
      ENDPOINT.FETCH_USERNAMES,
      buildHeaders(state, data),
    );
    yield put(fetchUsernamesSuccess(usernames));
  } catch (e: any) {
    yield put(fetchUsernamesFailed(e.message as string));
  }
}

export function* inviteUserSaga({ payload }: { payload: string }): any {
  try {
    const state: RootState = yield select();
    const eventId = state.events?.eventView?.id;

    const data = {
      username: payload,
      eventId: eventId,
    };
    yield call(callApi, ENDPOINT.INVITE_USER, buildHeaders(state, data));
    yield put(inviteUserSuccess());
    yield put(pushNotification(notifications.invitedSuccessfully(Date.now())));
  } catch (e: any) {
    yield put(
      pushNotification(notifications.inviteError(Date.now(), e.message)),
    );
  }
}

export function* fetchEventUsersSaga(): any {
  try {
    const state: RootState = yield select();
    const eventId = state.events?.eventView?.id;

    const data = {
      eventId: eventId,
    };
    if (!eventId) throw new Error();
    const users = yield call(
      callApi,
      ENDPOINT.EVENT_USERS,
      buildHeaders(state, data),
    );
    yield put(fetchEventUsersSuccess(transformUsers(users)));
  } catch (e: any) {
    yield put(fetchEventUsersFailed(e.message as string));
  }
}

export default function* root() {
  yield all([
    takeLatest(myEventRequest, fetchMyEventsSaga),
    takeLatest(createEventRequest, createEventSaga),
    takeLatest(fetchUsernamesRequest, fetchUsernamesSaga),
    takeLatest(inviteUserRequest, inviteUserSaga),
    takeLatest(fetchEventUsersRequest, fetchEventUsersSaga),
  ]);
}
