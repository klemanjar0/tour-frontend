import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { labels, PAGE } from '../../constants';
import { linkStyle } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import ProfileBadge from '../common/ProfileBadge';
import NavbarItems from '../common/NavbarItems';
import styled from 'styled-components';

const NavBarWithFont = styled(Navbar)`
  font-family: 'Circular Std', serif;
  height: auto;
`;

const NavBarBrand = styled.h4`
  font-family: 'Circular Std', serif;
  font-weight: bolder;
  color: black;
  text-align-all: center;
  height: auto;
  margin: auto;
`;

const CustomNavbar = () => {
  const isAuthorized = useAppSelector(
    (state: RootState) => !!state.auth.profile?.id,
  );
  const activeInvites = useAppSelector(
    (state: RootState) => state.invites.invites,
  );

  return (
    <NavBarWithFont bg="light" variant="light">
      <Container className="w-100">
        <div className="d-flex flex-row align-items-center">
          <NavBarBrand>
            <Link style={linkStyle} to={PAGE.HOME}>
              {labels.navbar.title}
            </Link>
          </NavBarBrand>
          {isAuthorized && (
            <NavbarItems activeInvitesCount={activeInvites.length} />
          )}
        </div>
        <div className="d-flex flex-row align-items-center">
          <ProfileBadge isAuthorized={isAuthorized} />
        </div>
      </Container>
    </NavBarWithFont>
  );
};

export default CustomNavbar;
