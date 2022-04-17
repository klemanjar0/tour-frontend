import { eventChannel } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import { configuredSocket } from './index';
import { socketActions } from './constants';
import { Socket } from 'socket.io-client';
import { pushNotification } from '../notifications/slice';
import { notifications } from '../constants';

const socketChannel = function (socket: Socket) {
  return eventChannel((emit) => {
    socket.on(socketActions.changes, (payload) => {
      emit(payload);
    });

    socket.on(socketActions.notification, (payload) => {
      emit({ type: socketActions.notification, payload: payload });
    });

    socket.on(socketActions.invite, (payload) => {
      emit({ type: socketActions.invite, payload: payload });
    });

    const unsubscribe = () => {
      socket.removeAllListeners(socketActions.changes);
    };

    return unsubscribe;
  });
};

export const watchSocket = function* (): any {
  const channel = yield call(socketChannel, configuredSocket);

  while (true) {
    const payload = yield take(channel);
    console.log(payload);
    if (payload.type === socketActions.invite) {
      yield put(pushNotification(notifications.newInvite(Date.now())));
    }
  }
};
