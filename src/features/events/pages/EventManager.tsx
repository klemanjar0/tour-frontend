import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  Placeholder,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useAppDispatch } from '../../store/hooks';
import {
  chooseWinnerRequest,
  clearEventView,
  deleteEventRequest,
  fetchEventUsersRequest,
  fetchUsernamesRequest,
  getEventRequest,
  inviteUserRequest,
  removeUserRequest,
} from '../slice';
import { useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaChevronLeft, FaTrashAlt, FaRedoAlt } from 'react-icons/fa';
import { EventRoles, EventStatuses } from '../types';
import { getEventStatus } from '../utils';
import useDebouncedOnChange from '../../utils/useDebouncedOnChange';
import useComponentDidUpdate from '../../utils/hooks';
import map from 'lodash/map';
import { spinnerStyle } from '../../auth/pages/styles';
import EventUserCard from './EventUserCard';
import StatusManager from './StatusManager';

const EventManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [debouncedChange] = useDebouncedOnChange({ onChange: setQuery });
  const fetching = useSelector(
    (state: RootState) => state.events.eventView.fetching,
  );
  const myId = useSelector((state: RootState) => state.auth?.profile?.id);
  const event = useSelector((state: RootState) => state.events.eventView.data);
  const users = useSelector((state: RootState) => state.events.assets.users);
  const usersFetching = useSelector(
    (state: RootState) => state.events.assets.fetching,
  );
  const eventViewSyncActionTime = useSelector(
    (state: RootState) => state.sync.eventViewSyncActionTime,
  );

  const eventUsers = useSelector(
    (state: RootState) => state.events.eventViewAssets.users,
  );
  const eventUsersFetching = useSelector(
    (state: RootState) => state.events.eventViewAssets.fetching,
  );

  const isUserAdminOnEvent = useSelector(
    (state: RootState) =>
      (state.events?.eventView.data?.myRole || 0) >= EventRoles.OWNER,
  );

  const openedToInvite =
    (event?.status || 0) === EventStatuses.REGISTRATION_PENDING;

  const onBack = () => {
    navigate(`../${PAGE.MY_EVENTS}`);
    clearView();
  };

  const clearView = () => {
    dispatch(clearEventView());
  };

  const update = () => {
    dispatch(getEventRequest(event?.id));
  };

  const onTextChange = (event: any) => {
    const val = event.target.value;
    setText(val);
    debouncedChange(val);
  };

  const inviteUser = (username: string) => {
    dispatch(inviteUserRequest(username));
  };

  const chooseWinner = (id: number) => () => {
    dispatch(chooseWinnerRequest(id));
  };

  const removeUser = (id: number) => () => {
    dispatch(removeUserRequest(id));
  };

  const closeEvent = () => {
    dispatch(deleteEventRequest(event?.id));
    onBack();
  };

  useComponentDidUpdate(() => {
    update();
  }, [eventViewSyncActionTime]);

  useEffect(() => {
    if (event?.id) {
      dispatch(fetchEventUsersRequest({}));
    }
  }, [eventViewSyncActionTime, event]);

  useEffect(() => {
    return clearView;
  }, []);

  useComponentDidUpdate(() => {
    dispatch(fetchUsernamesRequest(query));
  }, [query]);

  const disableStatusUpdate =
    event?.status === EventStatuses.FINISHED && !event.winnerId;
  return (
    <div>
      <Card body className="mt-3">
        <div className="d-flex w-100 flex-row align-items-center">
          <Button
            onClick={onBack}
            variant="outline-dark"
            className="d-flex mb-2 mx-1 flex-row p-1 align-items-center"
          >
            <FaChevronLeft className="mx-1" />
            <span className="mx-1">{labels.common.back}</span>
          </Button>
          <h3 className="mx-3">{event?.title}</h3>
          <div
            className="d-flex flex-row align-items-center position-absolute"
            style={{ right: 12 }}
          >
            <Button
              onClick={update}
              className="d-flex justify-content-center align-items-center"
              variant="secondary"
            >
              <span>{fetching ? 'Loading...' : 'Update'}</span>
              {!fetching ? (
                <FaRedoAlt className="mx-1" />
              ) : (
                <Spinner
                  animation={'border'}
                  size={'sm'}
                  style={spinnerStyle}
                />
              )}
            </Button>

            {isUserAdminOnEvent && (
              <Button
                onClick={closeEvent}
                variant="outline-danger"
                className="d-flex justify-content-center align-items-center m-1"
              >
                <FaTrashAlt className="mx-1" />
                <span className="mx-1">Delete Event</span>
              </Button>
            )}
          </div>
        </div>
        <hr />
        <div>
          <h5 className="m-1">Details</h5>
          <div className="p-1 w-25">
            <span>Type: {event?.type}</span> <br />
            <span>Country: {event?.country}</span> <br />
            <span>Prize: {event?.prizeFund}$</span> <br />
          </div>

          <div className="m-1">
            <h5>Description</h5>
            <span>{event?.description}</span>
          </div>
        </div>
        <hr />
        <StatusManager
          disabled={disableStatusUpdate}
          isAdmin={isUserAdminOnEvent}
        />
        <hr />
        <Row>
          <Col>
            <h5>Members</h5>
            <div style={{ overflowY: 'scroll', height: '22rem' }}>
              {!eventUsersFetching ? (
                map(eventUsers, (user) => (
                  <EventUserCard
                    key={user.username}
                    user={user}
                    isMyCard={myId === user.id}
                    role={event?.myRole}
                    removeUser={removeUser(user.id)}
                    status={event?.status}
                    chooseWinner={chooseWinner(user.id)}
                    isWinner={event?.winnerId === user.id}
                  />
                ))
              ) : (
                <div className="d-flex mt-4 w-100 justify-content-center align-items-center">
                  <Spinner style={spinnerStyle} animation="border" />
                </div>
              )}
            </div>
          </Col>
          {isUserAdminOnEvent && openedToInvite && (
            <Col>
              <h5>Invite new member</h5>
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
                    <Spinner
                      className="justify-content-center d-flex align-items-center"
                      style={spinnerStyle}
                      animation="border"
                    />
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
          )}
        </Row>
      </Card>
    </div>
  );
};

export default EventManager;
