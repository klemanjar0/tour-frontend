import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { increaseBalanceRequest } from '../../balance/silce';
import {
  StyledButton,
  StyledSubTitle,
  StyledText,
  StyledTextInput,
  StyledTitle,
} from '../../components/common/styledComponents';
import { mainGreen } from '../../colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 2rem;
  width: 100%;

  @media (max-width: 800px) {
    margin-top: 1rem;
    margin-left: 0;
  }
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

const _$ = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
      <StyledTitle>Balance</StyledTitle>
      <Row>
        <StyledSubTitle>Current account balance: ${account}</StyledSubTitle>
      </Row>
      <Row>
        <_$>
          <StyledText>Replenish the Balance</StyledText>
        </_$>
        <_$>
          <StyledText color={mainGreen}>$</StyledText>
          <StyledTextInput
            value={value}
            onChange={(event: any) => setValue(event.target.value)}
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
          />
          <StyledButton block onClick={checkout}>
            Checkout
          </StyledButton>
        </_$>
      </Row>
    </Container>
  );
};

export default LiqPayForm;
