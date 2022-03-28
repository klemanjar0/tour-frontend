import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useAppDispatch } from '../store/hooks';
import {
  pushNotification,
  removeNotification,
  hideNotification,
  clearNotifications,
} from './slice';
import { clearEvents } from '../events/slice';

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
    const _notify = { id: id, show: true, ...notification };
    dispatch(pushNotification(_notify));
  };

  const componentWillUnmount = () => {
    dispatch(clearNotifications());
  };

  useEffect(() => {
    return componentWillUnmount;
  }, []);

  return { notifications, showNotification };
};
