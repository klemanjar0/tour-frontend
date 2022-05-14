import React, { useEffect, useState } from 'react';
import { formContainer, spinnerStyle } from './styles';
import { labels, PAGE } from '../../constants';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError, loginRequest } from '../slice';
import { RootState } from '../../store';
import { flexColumnStyle, margin } from '../../styles';
import styled from 'styled-components';
import {
  StyledButton,
  StyledErrorText,
  StyledText,
  StyledTextInput,
  StyledTitle,
} from '../../components/common/styledComponents';

const Container = styled.div`
  padding: 2rem 4rem;

  @media (max-width: 800px) {
    padding: 1rem 1rem;
  }
`;

const Body = styled.div`
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  gap: 12px;
`;

const Login = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector((state: RootState) => state.auth.error);
  const fetching = useAppSelector((state: RootState) => state.auth.fetching);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const authorize = () => {
    const payload = { email, password };
    dispatch(loginRequest(payload));
  };

  const onUnmount = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <>
      <Container>
        <StyledTitle>{labels.login.signIn}</StyledTitle>
        <Body>
          <StyledTextInput
            type="email"
            placeholder="Enter email or username..."
            value={email}
            onChange={(event: any) => setEmail(event.target.value)}
          />
          <StyledTextInput
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(event: any) => setPassword(event.target.value)}
          />
          <ButtonContainer>
            <StyledErrorText>{error ? error : ' '}</StyledErrorText>
            <StyledButton onClick={authorize} block>
              {fetching && (
                <Spinner style={spinnerStyle} size="sm" animation="border" />
              )}
              {labels.login.signIn}
            </StyledButton>
          </ButtonContainer>
        </Body>
      </Container>
    </>
  );
};

export default Login;
