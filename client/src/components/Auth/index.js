import React from 'react';
import { Switch } from 'react-router-dom';
import { renderPublicRoutes } from '../../configs/router.config';
import { AuthWrapper } from './styles';
import bgImage from '../../assets/images/bg-img.jpg';

const Auth = () => {
  return (
    <>
      <AuthWrapper style={{ backgroundImage: `url(${bgImage})` }}>
        <Switch>{renderPublicRoutes()}</Switch>
      </AuthWrapper>
    </>
  );
};

export default Auth;
