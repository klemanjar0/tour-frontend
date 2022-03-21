import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyEventsList from './MyEventsList';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import EventManager from './EventManager';

const Events = () => {
  const event = useAppSelector((state: RootState) => state.events.eventView);
  return (
    <div>
      <Container>
        <Row>
          {event ? (
            <>
              <Col sm={8}>
                <MyEventsList />
              </Col>
              <Col sm={4}>
                <EventManager />
              </Col>
            </>
          ) : (
            <Col>
              <MyEventsList />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Events;
