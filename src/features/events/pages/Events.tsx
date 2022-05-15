import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1.2rem 3rem;
  padding-bottom: 5rem;
`;

const Events = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Events;
