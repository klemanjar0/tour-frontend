import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';
import { buildHeaders, callApi, ENDPOINT, setHeaders } from '../api';
import { RootState } from '../store';
import { loginRequest, loginSuccess, loginFailed } from './slice';

export function* loginUserSaga({ payload }: any): any {
  try {
    const state: RootState = yield select();
    const { email, password } = payload;
    console.log(payload);
    const json = {
      email,
      password,
    };
    const response = yield call(
      callApi,
      ENDPOINT.LOGIN,
      buildHeaders(state, json),
    );

    const authHeader = response.authToken;

    yield call(setHeaders, { authToken: authHeader });
    yield put(loginSuccess(response));
  } catch (e: any) {
    yield put(loginFailed(e.message as string));
  }
}

export default function* root() {
  yield all([takeLatest(loginRequest, loginUserSaga)]);
}
