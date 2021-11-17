import React from 'react';
import Auth from '../components/Auth/index';

const AuthPage = ({ isAuth }) => {
  return (
    <>
      <Auth isAuth={isAuth} />
    </>
  );
};

export default AuthPage;
