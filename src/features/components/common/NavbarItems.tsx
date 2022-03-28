import React from 'react';
import { linkStyle } from '../../styles';
import { labels, PAGE } from '../../constants';
import { Link } from 'react-router-dom';

const NavbarItems = () => {
  return (
    <Link style={linkStyle} to={`/${PAGE.EVENTS}/${PAGE.MY_EVENTS}`}>
      {labels.navbar.events}
    </Link>
  );
};

export default NavbarItems;
