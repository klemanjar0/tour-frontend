import React, { useEffect, useState } from 'react';
import {
  dividerGreenStyles,
  formContainer,
  loginBar,
  loginBarH1,
} from './styles';
import { labels, PAGE } from '../../constants';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginRequest } from '../slice';
import { RootState } from '../../store';
import { flexColumnStyle, margin } from '../../styles';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((state: RootState) => state.auth.error);
  const isAuthorized = useAppSelector(
    (state: RootState) => !!state.auth?.profile?.id,
  );

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const authorize = () => {
    const payload = { email, password };
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    console.log(email);
  }, [email]);

  if (isAuthorized) {
    navigate(PAGE.HOME, { replace: true });
  }

  return (
    <>
      <div style={formContainer}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event: any) => setEmail(event.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event: any) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div style={flexColumnStyle}>
            {!!error && (
              <Form.Text style={margin} className="text-danger">
                {error}
              </Form.Text>
            )}
            <Button variant="primary" type="button" onClick={authorize}>
              {labels.login.signIn}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
