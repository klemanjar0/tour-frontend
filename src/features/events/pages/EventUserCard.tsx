import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { getUserRoleTitle } from '../../utils';
import { UserRoleColor } from '../../constants';

const EventUserCard = ({ user, isMyCard }: any) => {
  return (
    <Card
      style={{
        padding: 10,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>{user.username}</div>
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
      <div>
        <Button style={{ margin: 2 }} variant={'outline-info'}>
          Ban
        </Button>
        <Button style={{ margin: 2 }} variant={'outline-danger'}>
          Remove
        </Button>
      </div>
    </Card>
  );
};

export default EventUserCard;
