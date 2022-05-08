import { all, takeLatest, select, put, call } from 'redux-saga/effects';
import {
  chooseWinnerRequest,
  chooseWinnerSuccess,
  createEventFailed,
  createEventRequest,
  createEventSuccess,
  deleteEventRequest,
  deleteEventSuccess,
  fetchEventUsersFailed,
  fetchEventUsersRequest,
  fetchEventUsersSuccess,
  fetchUsernamesFailed,
  fetchUsernamesRequest,
  fetchUsernamesSuccess,
  getEventFailed,
  getEventRequest,
  getEventSuccess,
  inviteUserRequest,
  inviteUserSuccess,
  myEventFailed,
  myEventRequest,
  myEventSuccess,
  removeUserRequest,
  removeUserSuccess,
  setMaxEventPrize,
  updateStatusRequest,
  updateStatusSuccess,
} from './slice';
import { RootState } from '../store';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import { buildEventsJson, transformEvents, transformUsers } from './utils';
import { EventStatuses, IEvent } from './types';
import {
  updateEventsSyncActionTime,
  updateEventViewSyncActionTime,
} from '../syncConnector/slice';
import { pushNotification } from '../notifications/slice';
import { notifications } from '../constants';
import { getBalanceSaga } from '../balance/sagas';

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
    yield call(getBalanceSaga);
  } catch (e: any) {
    yield put(createEventFailed(e.message as string));
    yield put(
      pushNotification(notifications.defaultError(Date.now(), e.message)),
    );
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
    const eventId = state.events?.eventView.data?.id;

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
    const eventId = state.events.eventView.data?.id;

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

export function* removeUserFromEventSaga({
  payload,
}: {
  payload: number;
}): any {
  try {
    const state: RootState = yield select();
    const eventId = state.events?.eventView.data?.id;

    const data = {
      eventId: eventId,
      userId: payload,
    };
    if (!eventId) throw new Error();
    yield call(
      callApi,
      ENDPOINT.REMOVE_USER_FROM_EVENT,
      buildHeaders(state, data),
    );
    yield put(removeUserSuccess());
    yield put(fetchEventUsersRequest({}));
  } catch (e: any) {
    yield put(pushNotification(notifications.removeUserError(Date.now())));
  }
}

export function* getEventSaga({ payload }: { payload: number }): any {
  try {
    const state: RootState = yield select();

    const event = yield call(
      callApi,
      ENDPOINT.GET_EVENT(payload),
      buildHeaders(state, {}, 'GET'),
    );
    yield put(getEventSuccess(event));
  } catch (e: any) {
    yield put(getEventFailed(e.message as string));
  }
}

export function* removeEventSaga({ payload }: { payload: number }): any {
  try {
    const state: RootState = yield select();

    yield call(
      callApi,
      ENDPOINT.DELETE_EVENT(payload),
      buildHeaders(state, {}, 'DELETE'),
    );

    yield put(deleteEventSuccess());
    yield put(updateEventsSyncActionTime(Date.now()));
  } catch (e: any) {
    yield put(pushNotification(notifications.removeEventError(Date.now())));
  }
}

export function* updateStatusSaga({
  payload,
}: {
  payload: EventStatuses;
}): any {
  try {
    const state: RootState = yield select();

    const eventId = state.events?.eventView.data?.id;

    const data = {
      eventId: eventId,
      status: payload,
    };
    if (!eventId) throw new Error();

    yield call(
      callApi,
      ENDPOINT.UPDATE_EVENT_STATUS,
      buildHeaders(state, data, 'PATCH'),
    );

    yield put(updateStatusSuccess());
    yield call(getEventSaga, { payload: eventId as number });
  } catch (e: any) {
    yield put(pushNotification(notifications.updateStatusError(Date.now())));
  }
}

export function* chooseWinnerSaga({ payload }: { payload: number }): any {
  try {
    const state: RootState = yield select();
    const eventId = state.events?.eventView.data?.id;

    const data = {
      eventId: eventId,
      userId: payload,
    };
    if (!eventId) throw new Error();

    yield call(
      callApi,
      ENDPOINT.SET_EVENT_WINNER,
      buildHeaders(state, data, 'PUT'),
    );

    yield put(chooseWinnerSuccess());
    yield call(getEventSaga, { payload: eventId as number });
  } catch (e: any) {
    yield put(pushNotification(notifications.chooseWinnerError(Date.now())));
  }
}

export default function* root() {
  yield all([
    takeLatest(myEventRequest, fetchMyEventsSaga),
    takeLatest(createEventRequest, createEventSaga),
    takeLatest(fetchUsernamesRequest, fetchUsernamesSaga),
    takeLatest(inviteUserRequest, inviteUserSaga),
    takeLatest(fetchEventUsersRequest, fetchEventUsersSaga),
    takeLatest(removeUserRequest, removeUserFromEventSaga),
    takeLatest(getEventRequest, getEventSaga),
    takeLatest(deleteEventRequest, removeEventSaga),
    takeLatest(updateStatusRequest, updateStatusSaga),
    takeLatest(chooseWinnerRequest, chooseWinnerSaga),
  ]);
}
