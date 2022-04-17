import axios, { AxiosError, AxiosResponse } from 'axios';
import get from 'lodash/get';
import map from 'lodash/map';
import { Headers } from './index';
import { isInstanceOfHTTPError } from './utils';
import ErrorService, { ErrorCode } from './errorService';
import DispatchService from '../store/DispatchService';
import { logout } from '../auth/slice';
import { pushNotification } from '../notifications/slice';
import { notifications } from '../constants';
import { setBackRoute } from '../router/slice';

export const instance = axios.create();

const responseIntercept = {
  onFulfilled: (response: AxiosResponse): AxiosResponse => {
    if (isInstanceOfHTTPError(response.data)) {
      const error = ErrorService.getErrorDescription(response.data.errorCode);
      throw new Error(error);
    }
    return response;
  },
  onRejected: (error: AxiosError) => {
    const exception: number | undefined = get(error, [
      'response',
      'data',
      'errorCode',
    ]);
    if (exception === ErrorCode.tokenExpired) {
      DispatchService.dispatch(logout());
      DispatchService.dispatch(
        pushNotification(notifications.tokenExpired(Date.now())),
      );
      return;
    }
    throw new Error(`${exception}`);
  },
};

const setHeaders = (headers: Headers) => {
  map(headers, (value: string, key: string) => {
    instance.defaults.headers.common[key] = value;
  });
};

const NetworkService = () => {
  instance.interceptors.response.use(
    responseIntercept.onFulfilled,
    responseIntercept.onRejected,
  );

  return {
    request: instance,
    setDefaultHeaders: setHeaders,
  };
};

export default NetworkService();
