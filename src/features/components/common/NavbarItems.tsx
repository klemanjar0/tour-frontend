import React from 'react';
import { linkStyle } from '../../styles';
import { labels, PAGE } from '../../constants';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import { configuredSocket } from '../../socket';

const NavbarItems = ({
  activeInvitesCount,
}: {
  activeInvitesCount: number;
}) => {
  return (
    <>
      <Link style={linkStyle} to={`/${PAGE.EVENTS}/${PAGE.MY_EVENTS}`}>
        {labels.navbar.events}
      </Link>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link style={linkStyle} to={`/${PAGE.INVITES}`}>
          {labels.navbar.invites}
        </Link>
        <Badge bg={'info'} style={{ marginLeft: 4 }}>
          {activeInvitesCount}
        </Badge>
      </div>
    </>
  );
};

export default NavbarItems;
