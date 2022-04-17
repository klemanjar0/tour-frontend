import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { buildHeaders, callApi, callApiWithImage, ENDPOINT } from '../api';
import { RootState } from '../store';
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  registerSuccess,
  registerFailed,
  registerRequest,
  passwordChangeRequest,
  passwordChangeSuccess,
  passwordChangeFailed,
  logout,
  clear,
} from './slice';
import { setBackRoute } from '../router/slice';
import { PAGE } from '../constants';
import { appendImageURL } from './utils';
import { updateProfileSyncActionTime } from '../syncConnector/slice';
import NetworkService from '../api/NetworkService';

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

    yield call(NetworkService.setDefaultHeaders, { authToken: authHeader });
    const withImage = appendImageURL(response);
    yield put(loginSuccess(withImage));
  } catch (e: any) {
    yield put(loginFailed(e.message as string));
  }
}

export function* registerUserSaga({ payload }: any): any {
  try {
    const state: RootState = yield select();
    const { email, password, username, file } = payload;

    const uploaded = yield call(callApiWithImage, file);

    const json = {
      email,
      username,
      pwdHash: password,
      fileId: uploaded.fileId,
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

export function* changePasswordSaga({ payload }: any): any {
  try {
    const state: RootState = yield select();
    const { oldPassword, newPassword } = payload;

    yield call(
      callApi,
      ENDPOINT.UPDATE_PASSWORD,
      buildHeaders(state, { oldPassword, newPassword }, 'PUT'),
    );
    yield put(updateProfileSyncActionTime(Date.now()));
    yield put(passwordChangeSuccess());
  } catch (e: any) {
    yield put(passwordChangeFailed(e.message as string));
  }
}

export function* onLogout(): any {
  yield put(setBackRoute('/'));
  yield put(clear());
}

export default function* root() {
  yield all([
    takeLatest(loginRequest, loginUserSaga),
    takeLatest(registerRequest, registerUserSaga),
    takeLatest(passwordChangeRequest, changePasswordSaga),
    takeLatest(logout, onLogout),
  ]);
}
