import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useAppDispatch } from '../../store/hooks';
import {
  clearEventView,
  fetchEventUsersRequest,
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
import EventUserCard from './EventUserCard';

const EventManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [debouncedChange] = useDebouncedOnChange({ onChange: setQuery });
  const myId = useSelector((state: RootState) => state.auth?.profile?.id);
  const event = useSelector((state: RootState) => state.events.eventView);
  const users = useSelector((state: RootState) => state.events.assets.users);
  const usersFetching = useSelector(
    (state: RootState) => state.events.assets.fetching,
  );

  const eventUsers = useSelector(
    (state: RootState) => state.events.eventViewAssets.users,
  );
  const eventUsersFetching = useSelector(
    (state: RootState) => state.events.eventViewAssets.fetching,
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
    if (event?.id) {
      dispatch(fetchEventUsersRequest({}));
    }
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
        </div>
        <hr />
        <div>
          <span>Description: {event?.description}</span>
        </div>
        <hr />
        <Row>
          <Col>
            <h5>Event Users</h5>
            <div style={{ overflowY: 'scroll', height: '22rem' }}>
              {!eventUsersFetching ? (
                map(eventUsers, (user) => (
                  <EventUserCard
                    key={user.username}
                    user={user}
                    isMyCard={myId === user.id}
                  />
                ))
              ) : (
                <Spinner style={spinnerStyle} animation={'grow'} />
              )}
            </div>
          </Col>
          <Col>
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
              <div style={{ overflowY: 'scroll', height: '20rem' }}>
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
                          <Button onClick={() => inviteUser(user)}>
                            Invite
                          </Button>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Spinner style={spinnerStyle} animation={'grow'} />
                )}
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  marginTop: '2rem',
                  textAlign: 'center',
                }}
              >
                {query && 'No users found.'}
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EventManager;
