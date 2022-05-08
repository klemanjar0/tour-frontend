import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { getUserRoleTitle } from '../../utils';
import { UserRoleColor } from '../../constants';
import { EventRoles, EventStatuses } from '../types';
import styled from 'styled-components';
import { grayColor, mainGreen, paleGray } from '../../colors';
import {
  StyledRow,
  StyledText,
} from '../../components/common/styledComponents';
import { IUser, UserRoles } from '../../auth/types';

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${mainGreen};
  padding: 0.5rem 0;
  margin-bottom: 0.3rem;
  margin-right: 0.3rem;
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
      </StyledRow>

      {adminOrHigher && !statusClosed && (
        <div>
          {statusFinished && !isMyCard ? (
            <div>
              {!isWinner && (
                <Button onClick={chooseWinner}>Choose as winner</Button>
              )}
            </div>
          ) : (
            <div>
              {!isMyCard && (
                <div>
                  <Button style={{ margin: 2 }} variant={'outline-info'}>
                    Ban
                  </Button>
                  <Button
                    onClick={removeUser}
                    style={{ margin: 2 }}
                    variant={'outline-danger'}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </CardDiv>
  );
};

export default EventUserCard;
