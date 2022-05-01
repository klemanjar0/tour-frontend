import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background-color: green;
`;

const Text = styled.text`
  font-weight: bolder;
  color: white;
`;

const BalanceBar = () => {
  const account = useSelector<RootState>((state) => state.balance.account);

  return (
    <Container>
      <Text>Balance: ${account as string}</Text>
    </Container>
  );
};

export default BalanceBar;
