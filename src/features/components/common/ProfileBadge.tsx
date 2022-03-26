import React from 'react';
import { Container, Badge, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { clear } from '../../auth/slice';
import { labels, PAGE } from '../../constants';
import { linkStyle, linkStyleRed } from '../../styles';

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
    <Container className="flex flex-row justify-content-center align-items-center">
      {isAuthorized ? (
        <>
          <Image src={imageUrl} height={40} width={40} roundedCircle />
          <Link style={linkStyle} to={`/${PAGE.PROFILE}`}>
            {username}
          </Link>
          <Link style={linkStyleRed} to={PAGE.HOME} onClick={logOutUser}>
            {labels.navbar.logout}
          </Link>
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
