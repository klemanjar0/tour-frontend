import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

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
