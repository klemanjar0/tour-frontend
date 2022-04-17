import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CloseButton,
  Container,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useAppDispatch } from '../../store/hooks';
import {
  clearEventView,
  fetchUsernamesRequest,
  inviteUserRequest,
} from '../slice';
import { useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaChevronLeft } from 'react-icons/fa';
import { EventRoles } from '../types';
import { getEventStatus } from '../utils';
import useDebouncedOnChange from '../../utils/useDebouncedOnChange';
import useComponentDidUpdate from '../../utils/hooks';
import map from 'lodash/map';
import { spinnerStyle } from '../../auth/pages/styles';

const EventManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [debouncedChange] = useDebouncedOnChange({ onChange: setQuery });

  const event = useSelector((state: RootState) => state.events.eventView);
  const users = useSelector((state: RootState) => state.events.assets.users);
  const usersFetching = useSelector(
    (state: RootState) => state.events.assets.fetching,
  );
  const isUserAdminOnEvent = useSelector(
    (state: RootState) =>
      (state.events?.eventView?.myRole || 0) >= EventRoles.OWNER,
  );

  const onBack = () => {
    navigate(`../${PAGE.MY_EVENTS}`);
    dispatch(clearEventView());
  };

  const onTextChange = (event: any) => {
    const val = event.target.value;
    setText(val);
    debouncedChange(val);
  };

  const inviteUser = (username: string) => {
    dispatch(inviteUserRequest(username));
  };

  useEffect(() => {
    return onBack;
  }, []);

  useComponentDidUpdate(() => {
    dispatch(fetchUsernamesRequest(query));
  }, [query]);

  const status = getEventStatus(event?.status);
  return (
    <div>
      <Card body className="mt-3">
        <div className="d-flex flex-row align-items-center">
          <Button
            onClick={onBack}
            variant="outline-dark"
            className="d-flex mb-2 flex-row p-1 align-items-center"
          >
            <FaChevronLeft className="mx-1" />
            <span className="mx-1">{labels.common.back}</span>
          </Button>
          <h3 className="mx-3">{event?.title}</h3>
        </div>
        <hr />
        <div>
          <span>Type: {event?.type}</span> <br />
          <span>Country: {event?.country}</span> <br />
          <span>Prize: {event?.prizeFund}$</span> <br />
          <span>Status: {status}</span> <br />
        </div>
        <hr />
        <div>
          <span>Description: {event?.description}</span>
        </div>
        <hr />
        <div>
          <h5>Invite a user</h5>
          <Form>
            <Form.Control
              value={text}
              onChange={onTextChange}
              type="text"
              placeholder="Type username.."
            />
          </Form>
          {users?.length ? (
            <div style={{ overflowY: 'scroll', height: '200px' }}>
              {!usersFetching ? (
                <div style={{ marginTop: 5 }}>
                  {map(users, (user, idx) => {
                    return (
                      <Card
                        key={`${user}${idx}`}
                        style={{
                          padding: 10,
                          margin: 2,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{user}</span>
                        <Button onClick={() => inviteUser(user)}>Invite</Button>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Spinner style={spinnerStyle} animation={'grow'} />
              )}
            </div>
          ) : (
            <div>No users found.</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EventManager;
