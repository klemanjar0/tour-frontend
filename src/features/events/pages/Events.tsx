import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MyEventsList from './MyEventsList';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import EventManager from './EventManager';
import { Outlet, useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';

const Events = () => {
  return (
    <div>
      <Container className="pb-5">
        <Outlet />
      </Container>
    </div>
  );
};

export default Events;
