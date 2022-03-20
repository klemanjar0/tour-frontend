import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyEventsList from './MyEventsList';

const Events = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={8}>
            <MyEventsList />
          </Col>
          <Col sm={4}>sm=4</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Events;
