import axios from 'axios';
import map from 'lodash/map';
import { RootState } from '../store';
import ErrorService from './errorService';
import { isInstanceOfHTTPError } from './utils';

export const server = 'http://localhost:4000/'; //'http://192.168.1.103:4000/'

export const ENDPOINT = {
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
  INITIALIZE_ADMIN: 'auth/initialize_admin',
  ERROR_CODES: 'error-codes',
  MY_EVENTS: 'events/myEvents',
  UPLOAD_FILE: 'upload-file',
  GET_FILE: (fileId: number) => `file/${fileId}`,
  UPDATE_PASSWORD: 'user-manage/update-password',
};

export const withServer = (endpoint: string) => `${server}${endpoint}`;

const instance = axios.create();

export interface Headers {
  authToken: string;
}

export const setHeaders = (headers: Headers) => {
  map(headers, (value: string, key: string) => {
    instance.defaults.headers.common[key] = value;
  });
};

export const buildHeaders = (state: RootState, data: any, method = 'POST') => {
  const authToken = state.auth.authToken;

  const jsonHeader = data ? { 'Content-Type': 'application/json' } : {};

  return {
    method,
    headers: {
      ...jsonHeader,
      authToken: authToken,
    },
    data,
  };
};

export const callApiWithImage = async (file: any) => {
  const formData = new FormData();

  formData.append('file', file);

  const response = await instance.post(
    withServer(ENDPOINT.UPLOAD_FILE),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export const callApi = async (url: string, options: any) => {
  const finalEndpoint = withServer(url);
  const response = await instance(finalEndpoint, options);

  if (isInstanceOfHTTPError(response.data)) {
    throw new Error(ErrorService.getErrorDescription(response.data.errorCode));
  }

  return response.data;
};

(async () => {
  const errors = await callApi(ENDPOINT.ERROR_CODES, { method: 'get' });
  ErrorService.setErrors(errors);
})();
