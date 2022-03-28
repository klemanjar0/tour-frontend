import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useAppDispatch } from '../store/hooks';
import {
  pushNotification,
  removeNotification,
  hideNotification,
} from './slice';

export interface Notification {
  id?: number;
  title: string;
  body: string;
  date: string;
  show?: boolean;
}

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.activeNotifications,
  );

  const showNotification = (notification: Notification) => {
    const id = Date.now();
    const _notify = { ...notification, id: id, show: true };
    dispatch(pushNotification(_notify));
  };

  return { notifications, showNotification };
};
