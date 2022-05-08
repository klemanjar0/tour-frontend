import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import { mainGreen } from '../../colors';

const Container = styled.div`
  margin: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
`;

const Text = styled.text`
  font-weight: bolder;
  color: ${mainGreen};
  font-size: inherit;
  font-family: 'Circular Std', serif;
`;

const BalanceBar = () => {
  const account = useSelector<RootState>((state) => state.balance.account);
  const fetching = useSelector<RootState>((state) => state.balance.fetching);
  return (
    <Container>
      {fetching ? (
        <Spinner animation={'border'} size="sm" />
      ) : (
        <Text>Balance: ${account as string}</Text>
      )}
    </Container>
  );
};

export default BalanceBar;
