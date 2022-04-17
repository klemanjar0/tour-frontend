import { RootState } from '../store';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import {
  getInvitesRequest,
  getInvitesSuccess,
  getInvitesFailed,
  declineInviteRequest,
  acceptInviteRequest,
} from './slice';
import { pushNotification } from '../notifications/slice';
import { notifications } from '../constants';
import { updateInvitesSyncActionTime } from '../syncConnector/slice';

export function* getInvitesSaga(): any {
  try {
    const state: RootState = yield select();
    const invites = yield call(
      callApi,
      ENDPOINT.MY_INVITES,
      buildHeaders(state, {}, 'GET'),
    );
    yield put(getInvitesSuccess(invites));
  } catch (e: any) {
    yield put(getInvitesFailed(e.message as string));
  }
}

export function* declineInviteSaga({ payload }: { payload: number }): any {
  try {
    const state: RootState = yield select();
    yield call(
      callApi,
      ENDPOINT.DECLINE_INVITE,
      buildHeaders(state, { inviteId: payload }, 'DELETE'),
    );
    yield put(updateInvitesSyncActionTime(Date.now()));
  } catch (e: any) {
    yield put(pushNotification(notifications.invitedDeclineError(Date.now())));
  }
}

export function* acceptInviteSaga({ payload }: { payload: number }): any {
  try {
    const state: RootState = yield select();
    yield call(
      callApi,
      ENDPOINT.ACCEPT_INVITE,
      buildHeaders(state, { inviteId: payload }),
    );
    yield put(updateInvitesSyncActionTime(Date.now()));
  } catch (e: any) {
    yield put(pushNotification(notifications.invitedAcceptError(Date.now())));
  }
}

export default function* root() {
  yield all([
    takeLatest(getInvitesRequest, getInvitesSaga),
    takeLatest(declineInviteRequest, declineInviteSaga),
    takeLatest(acceptInviteRequest, acceptInviteSaga),
  ]);
}
