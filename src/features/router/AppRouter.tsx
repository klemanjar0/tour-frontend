import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import App from '../../App';
import Login from '../auth/pages/Login';
import CustomNavbar from '../components/navbar/Navbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { PAGE } from '../constants';
import Register from '../auth/pages/Register';
import { setCurrentRoute } from './slice';
import { useObservableRouter } from './hooks';
import Events from '../events/pages/Events';
import Profile from '../profile/pages/Profile';

const unAuthorizedPages: React.ReactElement[] = [
  <Route
    key={`page_${PAGE.REGISTER}`}
    path={PAGE.REGISTER}
    element={<Register />}
  />,
  <Route key={`page_${PAGE.LOGIN}`} path={PAGE.LOGIN} element={<Login />} />,
];

const authorizedPages: React.ReactElement[] = [
  <Route key={`page_${PAGE.EVENTS}`} path={PAGE.EVENTS} element={<Events />} />,
  <Route
    key={`page_${PAGE.PROFILE}`}
    path={PAGE.PROFILE}
    element={<Profile />}
  />,
];

const AppRouter = () => {
  useObservableRouter();

  const isAuthorized = useAppSelector(
    (state: RootState) => !!state.auth?.profile?.id,
  );

  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<App />} />
        {isAuthorized ? authorizedPages : unAuthorizedPages}
      </Routes>
    </>
  );
};

export default AppRouter;
