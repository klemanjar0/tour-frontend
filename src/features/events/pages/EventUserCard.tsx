import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { getUserRoleTitle } from '../../utils';
import { UserRoleColor } from '../../constants';
import { EventRoles, EventStatuses } from '../types';

const EventUserCard = ({
  user,
  isMyCard,
  role,
  removeUser,
  status,
  chooseWinner,
  isWinner,
}: any) => {
  const adminOrHigher = role >= EventRoles.OWNER;
  const statusFinished = status === EventStatuses.FINISHED;
  const statusClosed = status === EventStatuses.CLOSED;
  return (
    <Card
      style={{
        padding: 10,
        marginBottom: 2,
        marginRight: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isWinner ? 'yellow' : undefined,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>{user.username}</div>
        {isMyCard && (
          <Badge
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 12,
            }}
            bg="warning"
          >
            Me
          </Badge>
        )}
        <Badge
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 12,
          }}
          bg={UserRoleColor[user.eventRole as string]}
        >
          {getUserRoleTitle(user.eventRole)}
        </Badge>
      </div>
      {adminOrHigher && !statusClosed && (
        <div>
          {statusFinished && !isMyCard ? (
            <div>
              <Button onClick={chooseWinner}>Choose as winner</Button>
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
    </Card>
  );
};

export default EventUserCard;
