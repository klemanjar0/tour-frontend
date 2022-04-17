import { io } from 'socket.io-client';
import { socketServer } from '../api';
import { socketActions } from './constants';

export const configuredSocket = io(socketServer);

export const authEmit = (authToken: string) => {
  configuredSocket.emit(socketActions.setId, { authToken });
};

export const setAuthSocketToken = (authToken: string) => {
  configuredSocket.auth = {
    authToken,
  };
};
