import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getAccountFailure,
  getAccountRequest,
  getAccountSuccess,
  increaseBalanceRequest,
  increaseBalanceSuccess,
} from './silce';
import { RootState } from '../store';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import { BalanceIncreasePayload } from './entities';
import { pushNotification } from '../notifications/slice';
import { notifications } from '../constants';

export function* getBalanceSaga(): any {
  try {
    const state: RootState = yield select();

    const response = yield call(
      callApi,
      ENDPOINT.GET_ACCOUNT,
      buildHeaders(state, {}, 'GET'),
    );
    yield put(getAccountSuccess(response));
  } catch (e: any) {
    yield put(getAccountFailure(e.message as string));
  }
}

export function* increaseBalanceSaga({
  payload,
}: {
  payload: BalanceIncreasePayload;
}): any {
  try {
    const state: RootState = yield select();
    const id = state.balance.balanceId;
    const { amount } = payload;
    yield call(
      callApi,
      ENDPOINT.INCREASE_BALANCE,
      buildHeaders(state, { id, amount }),
    );
    yield put(increaseBalanceSuccess());
  } catch (e: any) {
    yield put(
      pushNotification(notifications.paymentError(Date.now(), e.message)),
    );
  } finally {
    yield call(getBalanceSaga);
  }
}

export default function* root() {
  yield all([
    takeLatest(getAccountRequest, getBalanceSaga),
    takeLatest(increaseBalanceRequest, increaseBalanceSaga),
  ]);
}
