import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getAccountFailure,
  getAccountRequest,
  getAccountSuccess,
} from './silce';
import { RootState } from '../store';
import { buildHeaders, callApi, ENDPOINT } from '../api';

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

export default function* root() {
  yield all([takeLatest(getAccountRequest, getBalanceSaga)]);
}
