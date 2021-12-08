import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { renderPublicRoutes } from '../configs/router.config';
import { AuthWrapper } from '../containers/Auth/styles';

const AuthPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <>
        <AuthWrapper>
          <Switch>{renderPublicRoutes(isAuthenticated)}</Switch>
        </AuthWrapper>
      </>
    </>
  );
};

export default AuthPage;
