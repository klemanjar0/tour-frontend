import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { myEventRequest, clearEvents } from '../slice';
import { RootState } from '../../store';
import { Spinner } from 'react-bootstrap';
import { centerFlex, spinnerStyle } from '../../auth/pages/styles';
import EventItem from './EventItem';
import { TransformedEvent } from '../types';

const MyEventsList = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector((state: RootState) => state.events.fetching);
  const events = useAppSelector((state: RootState) => state.events.myEvents);

  const renderItem = (item: TransformedEvent) => {
    return <EventItem event={item} key={`event_card${item.id}`} />;
  };
  const onUnmount = () => {
    dispatch(clearEvents());
  };

  useEffect(() => {
    dispatch(myEventRequest());
    return onUnmount;
  }, []);

  return (
    <div className="m-1">
      {fetching && (
        <div style={centerFlex}>
          <Spinner className="m-5" style={spinnerStyle} animation="border" />
        </div>
      )}
      <div className="m-1">{events.map(renderItem)}</div>
    </div>
  );
};

export default MyEventsList;
