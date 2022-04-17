import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { authEmit, setAuthSocketToken } from './index';
import { useEffect } from 'react';

export const useAuthedSocket = () => {
  const id = useSelector((state: RootState) => state.auth.profile?.id);
  const authToken =
    useSelector((state: RootState) => state.auth.authToken) || '';

  useEffect(() => {
    setAuthSocketToken(authToken);
    authEmit(authToken);
  }, [authToken, id]);
};
