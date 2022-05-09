import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  acceptInviteRequest,
  declineInviteRequest,
  getInvitesRequest,
} from '../slice';
import { RootState } from '../../store';
import map from 'lodash/map';
import styled from 'styled-components';
import {
  StyledButton,
  StyledRow,
  StyledSubTitle,
  StyledSubTitleAccent,
  StyledText,
  StyledTitle,
} from '../../components/common/styledComponents';
import { mainGreen, paleGray, sunsetOrange } from '../../colors';

const Container = styled.div`
  margin-top: 2rem;
  padding: 0 3rem;
`;

const Card = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${paleGray};
`;

const Button = styled(StyledButton)`
  border: none;
  border-bottom: 1px solid
    ${(props: { borderColor: string }) => props.borderColor};
`;

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
    <Container>
      <StyledTitle style={{ marginBottom: 30 }}>Invites</StyledTitle>
      {invites.length ? (
        map(invites, (invite) => {
          return (
            <Card key={invite.id}>
              <StyledSubTitleAccent>{invite.event.title}</StyledSubTitleAccent>
              <StyledRow>
                <Button
                  onClick={() => acceptInvite(invite.id)}
                  style={{ margin: 2 }}
                  borderColor={mainGreen}
                >
                  <StyledText color={mainGreen}>Accept</StyledText>
                </Button>
                <Button
                  onClick={() => declineInvite(invite.id)}
                  style={{ margin: 2 }}
                  borderColor={sunsetOrange}
                >
                  <StyledText color={sunsetOrange}>Decline</StyledText>
                </Button>
              </StyledRow>
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
          <StyledText>No invites yet.</StyledText>
        </Card>
      )}
    </Container>
  );
};

export default Invites;
