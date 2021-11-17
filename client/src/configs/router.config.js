import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Import Pages
import HomePage from '../pages/HomePage';
import SettingPage from '../pages/SettingPage';
import Login from '../components/Auth/Login/index';
import Signup from '../components/Auth/Signup/index';

// Route List
const routePublicListFn = (isAuth) => {
  return [
    {
      path: '/login',
      isProtect: false,
      exact: false,
      page: () => <Login isAuth={isAuth} />,
    },
    {
      path: '/signup',
      isProtect: false,
      exact: false,
      page: () => <Signup isAuth={isAuth} />,
    },
  ];
};

const routePrivateListFn = (isAuth) => {
  return [
    {
      path: '/',
      isProtect: false,
      exact: true,
      page: () => <HomePage isAuth={isAuth} />,
    },
    {
      path: '/setting',
      isProtect: true,
      exact: true,
      page: () => <SettingPage isAuth={isAuth} />,
    },
  ];
};

const RedirectLogin = () => <Redirect to="/login" />;

// Public Routes
export const renderPublicRoutes = (isAuth) => {
  const routeList = routePublicListFn(isAuth);
  return routeList.map((route, index) => {
    const { path, exact, page, isProtect } = route;
    const pageRender = !isProtect ? page : isAuth ? page : RedirectLogin;
    return <Route path={path} exact={exact} key={index} component={pageRender} />;
  });
};
// Private Routes
export const renderPrivateRoutes = (isAuth) => {
  const routeList = routePrivateListFn(isAuth);
  return routeList.map((route, index) => {
    const { path, exact, page, isProtect } = route;
    const pageRender = !isProtect ? page : isAuth ? page : RedirectLogin;
    return <Route path={path} exact={exact} key={index} component={pageRender} />;
  });
};
