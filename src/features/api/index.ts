import axios from 'axios';
import map from 'lodash/map';
import { RootState } from '../store';
import ErrorService from './errorService';
import { isInstanceOfHTTPError } from './utils';
import { HttpStatus } from '../utils/http-status-codes';
import DispatchService from '../store/DispatchService';
import { clear as logout } from '../auth/slice';
import { pushNotification } from '../notifications/slice';
import { notifications } from '../constants';
import NetworkService from './NetworkService';

export const server = 'http://localhost:4000/'; //'http://192.168.1.103:4000/'

export const ENDPOINT = {
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
  INITIALIZE_ADMIN: 'auth/initialize_admin',
  ERROR_CODES: 'error-codes',
  MY_EVENTS: 'events/myEvents',
  MAX_EVENTS_PRIZE_FUND: 'events/getMaxPrize',
  UPLOAD_FILE: 'upload-file',
  GET_FILE: (fileId: number) => `file/${fileId}`,
  UPDATE_PASSWORD: 'user-manage/update-password',
  CREATE_EVENT: 'events/create',
};

export const withServer = (endpoint: string) => `${server}${endpoint}`;

export interface Headers {
  authToken: string;
}

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

  const response = await NetworkService.request.post(
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
  const response = await NetworkService.request(finalEndpoint, options);
  return response.data;
};

(async () => {
  const errors = await callApi(ENDPOINT.ERROR_CODES, { method: 'get' });
  ErrorService.setErrors(errors);
})();
