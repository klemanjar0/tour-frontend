import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../../App';
import Login from '../auth/pages/Login';
import CustomNavbar from '../components/navbar/Navbar';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';

const AppRouter = () => {
  const isAuthorized = useAppSelector(
    (state: RootState) => !!state.auth?.profile?.id,
  );

  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<App />} />
        {!isAuthorized && [<Route path="login" element={<Login />} />]}
      </Routes>
    </>
  );
};

export default AppRouter;
