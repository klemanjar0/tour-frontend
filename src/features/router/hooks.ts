import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { useEffect } from 'react';
import { setCurrentRoute, setBackRoute } from './slice';

export const useObservableRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const backRoute = useAppSelector(
    (state: RootState) => state.router.backRoute,
  );
  useEffect(() => {
    if (backRoute !== null) {
      navigate(backRoute, { replace: true });
      dispatch(setBackRoute(null));
    }
  }, [backRoute]);

  useEffect(() => {
    dispatch(setCurrentRoute(location.pathname));
  }, [location]);
};
