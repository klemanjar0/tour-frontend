import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { buildHeaders, callApi, ENDPOINT, setHeaders } from '../api';
import { RootState } from '../store';
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  registerSuccess,
  registerFailed,
  registerRequest,
} from './slice';
import { setBackRoute } from '../router/slice';
import { PAGE } from '../constants';

export function* loginUserSaga({ payload }: any): any {
  try {
    const state: RootState = yield select();
    const { email, password } = payload;

    const json = {
      email,
      password,
    };
    const response = yield call(
      callApi,
      ENDPOINT.LOGIN,
      buildHeaders(state, json),
    );
    yield put(setBackRoute(PAGE.HOME));
    const authHeader = response.authToken;

    yield call(setHeaders, { authToken: authHeader });
    yield put(loginSuccess(response));
  } catch (e: any) {
    yield put(loginFailed(e.message as string));
  }
}

export function* registerUserSaga({ payload }: any): any {
  try {
    const state: RootState = yield select();
    const { email, password, username } = payload;
    const json = {
      email,
      username,
      pwdHash: password,
    };
    const response = yield call(
      callApi,
      ENDPOINT.REGISTER,
      buildHeaders(state, json),
    );
    yield put(registerSuccess(response));
  } catch (e: any) {
    yield put(registerFailed(e.message as string));
  }
}

export default function* root() {
  yield all([
    takeLatest(loginRequest, loginUserSaga),
    takeLatest(registerRequest, registerUserSaga),
  ]);
}
