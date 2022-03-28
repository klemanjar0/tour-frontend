import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MyEventsList from './MyEventsList';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import EventManager from './EventManager';
import { Outlet, useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';

const Events = () => {
  const event = useAppSelector((state: RootState) => state.events.eventView);

  return (
    <div>
      <Container className="pb-5">
        <Row>
          <Outlet />
        </Row>
      </Container>
    </div>
  );
};

export default Events;
