import React from 'react';
import { Card, Stack, Button } from 'react-bootstrap';
import { TransformedEvent } from '../types';
import { labels } from '../../constants';
import { getEventStatus } from '../utils';
import { useAppDispatch } from '../../store/hooks';
import { openEventView } from '../slice';

interface Props {
  event: TransformedEvent;
}

const EventItem: React.FC<Props> = (props) => {
  const { event } = props;
  const status = getEventStatus(event.status);

  const dispatch = useAppDispatch();

  const setEventView = () => {
    dispatch(openEventView(event));
  };

  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>
          <Stack
            direction="horizontal"
            className="flex justify-content-between"
          >
            <div>{event.title}</div>
            <div className="text-success">{event.prizeFund}$</div>
          </Stack>
        </Card.Title>
        <hr />
        <Card.Subtitle className="mb-2">{status}</Card.Subtitle>
        <Card.Text>{event.description}</Card.Text>
        <Button
          onClick={setEventView}
          variant="outline-primary"
          className="w-100"
        >
          {labels.event.manage}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventItem;
