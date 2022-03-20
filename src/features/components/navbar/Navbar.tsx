import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';
import { alignRight, linkStyle, navbarStyle } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { clear } from '../../auth/slice';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(
    (state: RootState) => !!state.auth.profile?.id,
  );

  const username = useAppSelector(
    (state: RootState) => state.auth.profile?.username,
  );

  const logOutUser = () => {
    dispatch(clear());
    navigate(PAGE.HOME, { replace: true });
  };

  return (
    <Navbar bg="light" variant="light">
      <Container style={navbarStyle}>
        <Navbar.Brand>
          <Link style={linkStyle} to={PAGE.HOME}>
            {labels.navbar.title}
          </Link>
        </Navbar.Brand>
        {isAuthorized ? (
          <Nav style={alignRight}>
            <Link style={linkStyle} to={`/${PAGE.PROFILE}`}>
              {username}
            </Link>
            <Link style={linkStyle} to={PAGE.HOME} onClick={logOutUser}>
              {labels.navbar.logout}
            </Link>
          </Nav>
        ) : (
          <Nav style={alignRight}>
            <Link style={linkStyle} to={`/${PAGE.LOGIN}`}>
              {labels.navbar.login}
            </Link>
            <Link style={linkStyle} to={`/${PAGE.REGISTER}`}>
              {labels.navbar.register}
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
