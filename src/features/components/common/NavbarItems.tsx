import React from 'react';
import { linkStyle } from '../../styles';
import { labels, PAGE } from '../../constants';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { configuredSocket } from '../../socket';
import styled from 'styled-components';
import { mainGreen } from '../../colors';

const StyledLink = styled(Link)`
  font-weight: inherit;
  color: black;
  font-size: inherit;
  font-family: 'Circular Std', serif;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.1em;
  background-color: ${mainGreen};
  border-radius: 5px;
  padding: 0.1rem 0.7rem;
  color: white;
`;

const Container = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const NavbarItems = ({
  activeInvitesCount,
}: {
  activeInvitesCount: number;
}) => {
  return (
    <Container>
      <StyledLink style={linkStyle} to={`/${PAGE.EVENTS}/${PAGE.MY_EVENTS}`}>
        {labels.navbar.events}
      </StyledLink>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <StyledLink style={linkStyle} to={`/${PAGE.INVITES}`}>
          {labels.navbar.invites}
        </StyledLink>
        <Badge>{activeInvitesCount} Active</Badge>
      </div>
    </Container>
  );
};

export default NavbarItems;
