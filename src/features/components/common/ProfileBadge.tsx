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

interface Props {
  isAuthorized: boolean;
}

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
    <Container className="d-flex flex-row justify-content-center align-items-center">
      {isAuthorized ? (
        <>
          <div className="d-flex flex-row align-items-center mr-4">
            <Link style={linkStyle} to={`/${PAGE.PROFILE}`}>
              {username}
            </Link>
          </div>
          <BalanceBar />
          <div
            className="d-flex flex-row justify-content-between align-items-center"
            onClick={logOutUser}
          >
            <Link style={linkStyleRed} to={PAGE.HOME}>
              {labels.navbar.logout}
            </Link>
            <FaSignOutAlt color="red" />
          </div>
        </>
      ) : (
        <>
          <Link style={linkStyle} to={`/${PAGE.LOGIN}`}>
            {labels.navbar.login}
          </Link>
          <Link style={linkStyle} to={`/${PAGE.REGISTER}`}>
            {labels.navbar.register}
          </Link>
        </>
      )}
    </Container>
  );
};

export default ProfileBadge;
