import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  acceptInviteRequest,
  declineInviteRequest,
  getInvitesRequest,
} from '../slice';
import { RootState } from '../../store';
import { Button, Card, Container } from 'react-bootstrap';
import map from 'lodash/map';

const Invites = () => {
  const dispatch = useAppDispatch();
  const invites = useAppSelector((state: RootState) => state.invites.invites);

  const declineInvite = (id: number) => {
    dispatch(declineInviteRequest(id));
  };

  const acceptInvite = (id: number) => {
    dispatch(acceptInviteRequest(id));
  };

  useEffect(() => {
    dispatch(getInvitesRequest());
  }, []);

  return (
    <Container style={{ marginTop: 10 }}>
      <h3>Invites</h3>
      {invites.length ? (
        map(invites, (invite) => {
          return (
            <Card
              key={invite.id}
              style={{
                margin: 5,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h5>{invite.event.title}</h5>
              <div>
                <Button
                  onClick={() => acceptInvite(invite.id)}
                  style={{ margin: 2 }}
                  variant={'success'}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => declineInvite(invite.id)}
                  style={{ margin: 2 }}
                  variant={'danger'}
                >
                  Decline
                </Button>
              </div>
            </Card>
          );
        })
      ) : (
        <Card
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          No invites yet.
        </Card>
      )}
    </Container>
  );
};

export default Invites;
