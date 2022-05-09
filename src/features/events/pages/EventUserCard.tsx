import React from 'react';
import { Button } from 'react-bootstrap';
import { getUserRoleTitle } from '../../utils';
import { EventRoles, EventStatuses } from '../types';
import styled from 'styled-components';
import { grayColor, mainGreen, sunsetOrange } from '../../colors';
import {
  StyledButton,
  StyledRow,
  StyledText,
} from '../../components/common/styledComponents';
import { IoLogOut, IoRibbonOutline } from 'react-icons/io5';

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${mainGreen};
  padding: 0.5rem 0;
  margin-bottom: 0.3rem;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 0.3rem 1rem;
  margin-left: 0.5rem;
  border-radius: 5px;
  background-color: ${grayColor};
`;

interface Props {
  user: any;
  isMyCard: boolean;
  role?: EventRoles;
  removeUser: () => void;
  status?: EventStatuses;
  chooseWinner: () => void;
  isWinner: boolean;
}

const EventUserCard = ({
  user,
  isMyCard,
  role = 0,
  removeUser,
  status = 0,
  chooseWinner,
  isWinner,
}: Props) => {
  const adminOrHigher = role >= EventRoles.OWNER;
  const statusFinished = status === EventStatuses.FINISHED;
  const statusClosed = status === EventStatuses.CLOSED;
  return (
    <CardDiv>
      <StyledRow>
        <StyledText>{user.username}</StyledText>
        {isMyCard && (
          <Badge>
            <StyledText>Me</StyledText>
          </Badge>
        )}
        <Badge>
          <StyledText>{getUserRoleTitle(user.eventRole)}</StyledText>
        </Badge>
        {isWinner && (
          <IoRibbonOutline
            color={mainGreen}
            style={{ marginLeft: 14 }}
            size={32}
          />
        )}
      </StyledRow>

      {adminOrHigher && !statusClosed && (
        <StyledRow>
          {statusFinished && !isMyCard ? (
            <StyledRow>
              <StyledButton disabled={isWinner} onClick={chooseWinner}>
                <StyledText color={mainGreen}>
                  {isWinner ? 'Chosen' : 'Choose as winner'}
                </StyledText>
              </StyledButton>
            </StyledRow>
          ) : (
            <StyledRow>
              {!isMyCard && (
                <StyledRow>
                  <StyledButton>
                    <StyledText color={grayColor}>Ban</StyledText>
                  </StyledButton>
                  <StyledButton onClick={removeUser}>
                    <StyledText color={sunsetOrange}>Remove</StyledText>
                    <IoLogOut
                      style={{ marginLeft: 5, marginTop: 1 }}
                      color={sunsetOrange}
                      size={24}
                    />
                  </StyledButton>
                </StyledRow>
              )}
            </StyledRow>
          )}
        </StyledRow>
      )}
    </CardDiv>
  );
};

export default EventUserCard;
