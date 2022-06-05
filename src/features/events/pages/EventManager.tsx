import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../../store/hooks';
import {
  chooseWinnerRequest,
  clearEventView,
  clearUsernames,
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
import {
  grayColor,
  mainBlack,
  mainGreen,
  paleGray,
  sunsetOrange,
} from '../../colors';
import {
  StyledRow,
  StyledRowSpaceBetween,
  StyledScrollableDiv,
} from '../../components/common/styledComponents';
import SearchBar from '../../components/SearchBar/SearchBar';

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

const VideoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Card = styled.div`
  margin-top: 1rem;
`;

const Body = styled.div`
  margin-top: 1.5rem;
`;

const VideoBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
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

const Input = styled.input`
  font-family: 'Circular Std', serif;
  font-weight: normal;
  outline: none;
  padding: 0.5em 0.7em;
  border: none;
  border-bottom: 2px solid ${mainGreen};

  ::placeholder:focus {
    color: #cccccc;
  }
`;

const EventManager = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
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
    if (query.length) {
      dispatch(fetchUsernamesRequest(query));
    } else {
      dispatch(clearUsernames());
    }
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

      <VideoRow>
        <Body>
          <SubTitle>Details</SubTitle>
          <Text>Type: {event?.type}</Text> <br />
          <Text>Country: {event?.country}</Text> <br />
          <Text>Prize: {event?.prizeFund}$</Text> <br />
        </Body>

        {event?.twitchUrl &&
          event?.twitchUrl !== 'null' &&
          event.status === EventStatuses.ACTIVE && (
            <VideoBody>
              <iframe
                src={`${event?.twitchUrl}&parent=localhost`}
                frameBorder="0"
                allowFullScreen={true}
                scrolling="no"
                height="478"
                width="720"
              />
            </VideoBody>
          )}
      </VideoRow>

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

      <StyledRowSpaceBetween>
        <SubTitle>Members</SubTitle>

        {isUserAdminOnEvent && openedToInvite && (
          <SearchBar
            fetching={usersFetching}
            value={query}
            onTextChange={setQuery}
            items={users}
            placeholder="Invite new user..."
            onSelectItem={inviteUser}
          />
        )}
      </StyledRowSpaceBetween>
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
    </Card>
  );
};

export default EventManager;
