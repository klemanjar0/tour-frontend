import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { myEventRequest, clearEvents } from '../slice';
import { RootState } from '../../store';
import { Spinner, Card, Button, Container } from 'react-bootstrap';
import { centerFlex, spinnerStyle } from '../../auth/pages/styles';
import EventItem from './EventItem';
import { TransformedEvent } from '../types';
import { labels, PAGE } from '../../constants';
import { useNavigate } from 'react-router-dom';

const MyEventsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetching = useAppSelector((state: RootState) => state.events.fetching);
  const events = useAppSelector((state: RootState) => state.events.myEvents);

  const renderItem = (item: TransformedEvent) => {
    return <EventItem event={item} key={`event_card${item.id}`} />;
  };
  const onUnmount = () => {
    dispatch(clearEvents());
  };

  const createEvent = () => {
    navigate(`../${PAGE.CREATE_EVENT}`);
  };

  useEffect(() => {
    dispatch(myEventRequest());
    return onUnmount;
  }, []);

  return (
    <div>
      <Container className="mt-3">
        <Button onClick={createEvent} className="w-100 mb-2">
          {labels.event.create}
        </Button>
        {fetching && (
          <div style={centerFlex}>
            <Spinner className="m-5" style={spinnerStyle} animation="border" />
          </div>
        )}
        {!!events.length && !fetching ? (
          <div className="mt-1">{events.map(renderItem)}</div>
        ) : (
          <Card body style={centerFlex}>
            {labels.event.noEvents}
          </Card>
        )}
      </Container>
    </div>
  );
};

export default MyEventsList;
