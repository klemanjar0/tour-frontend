import React, { useEffect, useState } from 'react';
import { formContainer, spinnerStyle } from './styles';
import { labels, PAGE } from '../../constants';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError, loginRequest } from '../slice';
import { RootState } from '../../store';
import { flexColumnStyle, margin } from '../../styles';

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
      <div style={formContainer}>
        <h1>{labels.login.signIn}</h1>
        <hr />
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
              {fetching && (
                <Spinner style={spinnerStyle} size="sm" animation="border" />
              )}
              {labels.login.signIn}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
