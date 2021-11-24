import React from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { renderPublicRoutes } from '../../configs/router.config';
import { AuthWrapper } from './styles';
import bgImage from '../../assets/images/bg-img.jpg';

const Auth = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <AuthWrapper style={{ backgroundImage: `url(${bgImage})` }}>
        <Switch>{renderPublicRoutes(isAuthenticated)}</Switch>
      </AuthWrapper>
    </>
  );
};

export default Auth;
