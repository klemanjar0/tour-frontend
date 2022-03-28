import React, { ReactElement } from 'react';
import { Notification } from '../NotificationService';
import { ToastContainer, Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store/hooks';
import { hideNotification, removeNotification } from '../slice';
interface Props {
  children: ReactElement | ReactElement[];
}

const NotificationProvider: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.activeNotifications,
  );
  const { children } = props;

  const removeItem = (id: number) => () => {
    dispatch(hideNotification(id));
    setTimeout(() => {
      removeNotification(id);
    }, 500);
  };

  const renderItem = (item: Notification) => {
    return (
      <Toast
        show={item.show}
        animation={true}
        onClose={removeItem(item?.id as number)}
        delay={4000}
        autohide
        key={`notify_${item.id}`}
      >
        <Toast.Header>
          <strong className="me-auto">{item.title}</strong>
          <small className="text-muted">{item.date}</small>
        </Toast.Header>
        <Toast.Body>{item.body}</Toast.Body>
      </Toast>
    );
  };

  return (
    <>
      {children}
      <ToastContainer className="p-3" position="top-end">
        {notifications.map(renderItem)}
      </ToastContainer>
    </>
  );
};

export default NotificationProvider;
