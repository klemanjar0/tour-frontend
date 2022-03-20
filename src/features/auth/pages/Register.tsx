import React, { useEffect, useState } from 'react';
import {
  InputGroup,
  FormControl,
  Form,
  FloatingLabel,
  Button,
  Spinner,
} from 'react-bootstrap';
import { formContainer, spinnerStyle } from './styles';
import { labels, PAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { flexColumnStyle, margin, marginTop } from '../../styles';
import { useNavigate } from 'react-router-dom';
import { clearError, registerRequest } from '../slice';

const Register = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const error = useAppSelector((state: RootState) => state.auth.error);
  const fetching = useAppSelector((state: RootState) => state.auth.fetching);
  const registrationSuccess = useAppSelector(
    (state: RootState) => state.auth.registerStatus,
  );
  const registrationEmail = useAppSelector(
    (state: RootState) => state.auth.profile?.email,
  );

  const clearFields = () => {
    [setUsername, setEmail, setPassword].map((fn) => fn(''));
  };

  const onUnmount = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    return onUnmount;
  }, []);

  const register = async () => {
    const payload = { username, email, password };
    dispatch(registerRequest(payload));
    if (!error) {
      clearFields();
    }
  };

  return (
    <div style={formContainer}>
      <h1>{labels.register.signUp}</h1>
      <hr />
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(event: any) => setUsername(event.target.value)}
          />
        </InputGroup>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event: any) => setEmail(event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event: any) => setPassword(event.target.value)}
          />
        </FloatingLabel>
        <div style={flexColumnStyle}>
          {!!error && (
            <Form.Text style={margin} className="text-danger">
              {error}
            </Form.Text>
          )}
          {!!registrationSuccess && (
            <Form.Text style={margin} className="text-success">
              {`Registration success. Now you can use ${registrationEmail} to login.`}
            </Form.Text>
          )}
          <Button variant="primary" type="button" onClick={register}>
            {fetching && (
              <Spinner style={spinnerStyle} size="sm" animation="border" />
            )}
            {labels.register.signUp}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
