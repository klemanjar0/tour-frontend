import React from 'react';
import { Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { clear, logout } from '../../auth/slice';
import { labels, PAGE } from '../../constants';
import { linkStyle, linkStyleRed } from '../../styles';
import { FaSignOutAlt, FaBell } from 'react-icons/fa';
import BalanceBar from '../../balance/BalanceBar/BalanceBar';
import styled from 'styled-components';

interface Props {
  isAuthorized: boolean;
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-weight: inherit;
  color: black;
  font-size: inherit;
  font-family: 'Circular Std', serif;
`;

const ProfileBadge: React.FC<Props> = (params) => {
  const dispatch = useAppDispatch();

  const { isAuthorized } = params;

  const username = useAppSelector(
    (state: RootState) => state.auth.profile?.username,
  );

  const logOutUser = () => {
    dispatch(logout());
  };

  return (
    <RowContainer>
      {isAuthorized ? (
        <>
          <div className="d-flex flex-row align-items-center mr-4">
            <StyledLink style={linkStyle} to={`/${PAGE.PROFILE}`}>
              {username}
            </StyledLink>
          </div>
          <BalanceBar />
          <div onClick={logOutUser}>
            <StyledLink style={linkStyleRed} to={PAGE.HOME}>
              {labels.navbar.logout}
            </StyledLink>
            <FaSignOutAlt color="red" />
          </div>
        </>
      ) : (
        <>
          <StyledLink style={linkStyle} to={`/${PAGE.LOGIN}`}>
            {labels.navbar.login}
          </StyledLink>
          <Link style={linkStyle} to={`/${PAGE.REGISTER}`}>
            {labels.navbar.register}
          </Link>
        </>
      )}
    </RowContainer>
  );
};

export default ProfileBadge;
