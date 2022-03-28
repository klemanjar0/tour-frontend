import React from 'react';
import { Container, NavDropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { clear } from '../../auth/slice';
import { labels, PAGE } from '../../constants';
import { linkStyle, linkStyleRed } from '../../styles';
import { FaSignOutAlt } from 'react-icons/fa';

interface Props {
  isAuthorized: boolean;
}

const ProfileBadge: React.FC<Props> = (params) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthorized } = params;

  const username = useAppSelector(
    (state: RootState) => state.auth.profile?.username,
  );
  const imageUrl = useAppSelector(
    (state: RootState) => state.auth.profile?.imageUrl,
  );

  const logOutUser = () => {
    dispatch(clear());
    navigate(PAGE.HOME, { replace: true });
  };
  return (
    <Container className="d-flex flex-row justify-content-center align-items-center">
      {isAuthorized ? (
        <>
          <div className="d-flex">
            <Link style={linkStyle} to={`/${PAGE.PROFILE}`}>
              {username}
            </Link>
          </div>
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
