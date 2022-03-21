import React, { useEffect } from 'react';
import { Card, CloseButton } from 'react-bootstrap';
import { useAppDispatch } from '../../store/hooks';
import { clearEventView } from '../slice';

const EventManager = () => {
  const dispatch = useAppDispatch();

  const closeManager = () => {
    dispatch(clearEventView());
  };

  useEffect(() => {
    return closeManager;
  }, []);

  return (
    <Card body className="m-1">
      <CloseButton onClick={closeManager} />
    </Card>
  );
};

export default EventManager;
