import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { myEventRequest, clearEvents } from '../slice';
import { RootState } from '../../store';
import { Spinner } from 'react-bootstrap';
import { spinnerStyle } from '../../auth/pages/styles';

const MyEventsList = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector((state: RootState) => state.events.fetching);

  const onUnmount = () => {
    dispatch(clearEvents());
  };

  useEffect(() => {
    dispatch(myEventRequest());
    return onUnmount;
  }, []);

  return (
    <div>
      {fetching && (
        <Spinner style={spinnerStyle} size="sm" animation="border" />
      )}
    </div>
  );
};

export default MyEventsList;
