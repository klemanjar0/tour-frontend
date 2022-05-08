import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import axios from 'axios';
import { checkoutPay } from './utils';
import { increaseBalanceRequest } from '../../balance/silce';

const Container = styled.div`
  margin: auto;
`;

const Header = styled.h2`
  font-weight: bolder;
`;

const Divider = styled.hr`
  width: 100%;
`;
const Body = styled.div`
  padding: 1px;
`;

const TextInput = styled.input`
  padding: 1px;
  border: 0;
  border-bottom: 1px solid green;
  font-weight: normal;
  font-size: 18px;
  margin-right: auto;
`;

const CardInput = styled.input`
  padding: 1px;
  border: 0;
  border-bottom: 1px solid black;
  font-weight: normal;
  font-size: 18px;
  margin-right: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
`;

const TextGreen = styled.text`
  color: green;
  font-weight: normal;
  margin-right: 4px;
  font-size: 18px;
`;

const Text = styled.text`
  color: black;
  font-weight: normal;
  margin-right: 0.5rem;
  font-size: 18px;
`;

const LiqPayForm = () => {
  const [value, setValue] = useState<number>(0);
  const account = useSelector<RootState>((state) => state.balance.account);
  const id = useSelector<RootState>((state) => state.balance.balanceId) || 0;
  const dispatch = useDispatch();

  const checkout = () => {
    setValue(0);
    dispatch(increaseBalanceRequest({ amount: value }));
  };

  return (
    <Container>
      <Header>Balance</Header>
      <Divider />
      <Body>
        <Row>
          <Text>Current account balance: ${account}</Text>
        </Row>
        <Divider />
        <Row>
          <Text>Replenish the Balance</Text>
          <TextGreen>$</TextGreen>
          <TextInput
            value={value}
            onChange={(event: any) => setValue(event.target.value)}
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
          />
          <Button onClick={checkout} variant="success">
            Checkout
          </Button>
        </Row>
        <Row>
          <Text>Withdraw</Text>
          <TextGreen>$</TextGreen>
          <TextInput type="number" min="0.00" max="10000.00" step="0.01" />
          <CardInput placeholder="Credit Card" />
          <Button variant="success">Proceed</Button>
        </Row>
      </Body>
    </Container>
  );
};

export default LiqPayForm;
