import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';
import { linkStyle } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import ProfileBadge from '../common/ProfileBadge';
import NavbarItems from '../common/NavbarItems';

const CustomNavbar = () => {
  const isAuthorized = useAppSelector(
    (state: RootState) => !!state.auth.profile?.id,
  );

  return (
    <Navbar bg="light" variant="light">
      <Container className="d-flex flex-row justify-content-between align-items-center w-100">
        <div className="d-flex flex-row align-items-center">
          <Navbar.Brand>
            <Link style={linkStyle} to={PAGE.HOME}>
              {labels.navbar.title}
            </Link>
          </Navbar.Brand>
          {isAuthorized && <NavbarItems />}
        </div>
        <div className="d-flex flex-row align-items-center">
          <ProfileBadge isAuthorized={isAuthorized} />
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
