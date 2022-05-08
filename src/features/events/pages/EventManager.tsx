import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Spinner } from 'react-bootstrap';
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
import { IoSync, IoTrashOutline } from 'react-icons/io5';
import { EventRoles, EventStatuses } from '../types';
import useDebouncedOnChange from '../../utils/useDebouncedOnChange';
import useComponentDidUpdate from '../../utils/hooks';
import map from 'lodash/map';
import { spinnerStyle } from '../../auth/pages/styles';
import EventUserCard from './EventUserCard';
import StatusManager from './StatusManager';
import styled from 'styled-components';
import { grayColor, mainBlack, paleGray, sunsetOrange } from '../../colors';
import { StyledScrollableDiv } from '../../components/common/styledComponents';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: auto;
`;

const Card = styled.div`
  margin-top: 1rem;
`;

const Body = styled.div`
  margin-top: 1.5rem;
`;

const Title = styled.h2`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${mainBlack};
`;

const SubTitle = styled.h4`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${grayColor};
`;

const Text = styled.span`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  color: ${(props: { color?: string }) => props.color || mainBlack};
`;

const HeaderButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.5em 0.7em;
  background-color: transparent;

  font-family: 'Circular Std', serif;
  font-weight: normal;
  font-size: larger;
  color: ${(props: { color?: string }) => props.color || mainBlack}
  transition: 0.2s ease-in-out;

  :hover {
    background-color: rgba(100, 100, 100, 0.2);
  }
`;

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
    <Card>
      <Header>
        <Row>
          <HeaderButton onClick={onBack}>
            <FaChevronLeft className="mx-1" />
            <Text className="mx-1">{labels.common.back}</Text>
          </HeaderButton>
        </Row>

        <Row>
          <HeaderButton onClick={update}>
            <Text>{fetching ? 'Loading...' : 'Update'}</Text>
            {!fetching ? (
              <IoSync className="mx-1" />
            ) : (
              <Spinner animation={'border'} size={'sm'} style={spinnerStyle} />
            )}
          </HeaderButton>
          {isUserAdminOnEvent && (
            <HeaderButton onClick={closeEvent}>
              <IoTrashOutline color={sunsetOrange} className="mx-1" />
              <Text color={sunsetOrange} className="mx-1">
                Delete Event
              </Text>
            </HeaderButton>
          )}
        </Row>
      </Header>

      <Body>
        <Title>{event?.title}</Title>
      </Body>

      <hr />

      <Body>
        <SubTitle>Details</SubTitle>
        <Text>Type: {event?.type}</Text> <br />
        <Text>Country: {event?.country}</Text> <br />
        <Text>Prize: {event?.prizeFund}$</Text> <br />
      </Body>

      <Body>
        <SubTitle>Description</SubTitle>
        <Text>{event?.description}</Text>
      </Body>

      <hr />
      <StatusManager
        disabled={disableStatusUpdate}
        isAdmin={isUserAdminOnEvent}
      />
      <hr />
      <Row>
        <Col>
          <SubTitle>Members</SubTitle>
          <StyledScrollableDiv>
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
          </StyledScrollableDiv>
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
              <StyledScrollableDiv>
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
              </StyledScrollableDiv>
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
  );
};

export default EventManager;
