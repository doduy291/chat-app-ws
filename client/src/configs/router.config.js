import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import Pages
import HomePage from '../pages/HomePage';
import Login from '../components/Auth/Login/index';
import Signup from '../components/Auth/Signup/index';
const ContactPage = React.lazy(() => import('../pages/ContactPage'));
const SettingPage = React.lazy(() => import('../pages/SettingPage'));

// Route List
const routePublicListFn = (isAuthenticated) => {
  return [
    {
      path: '/login',
      exact: false,
      page: <Login isAuth={isAuthenticated} />,
    },
    {
      path: '/signup',
      exact: false,
      page: <Signup isAuth={isAuthenticated} />,
    },
  ];
};

const routePrivateListFn = () => {
  return [
    {
      path: '/setting',
      exact: true,
      page: <SettingPage />,
    },
    {
      path: '/contact',
      exact: true,
      page: <ContactPage />,
    },
    {
      path: '/',
      exact: true,
      page: <HomePage />,
    },
  ];
};

// Public Routes
export const renderPublicRoutes = (isAuthenticated) => {
  const routeList = routePublicListFn(isAuthenticated);
  return routeList.map((route, index) => {
    const { path, exact, page } = route;
    return <Route path={path} exact={exact} key={index} render={() => page} />;
  });
};
// Private Routes
export const renderPrivateRoutes = () => {
  const routeList = routePrivateListFn();
  return routeList.map((route, index) => {
    const { path, exact, page } = route;
    return <PrivateRoute path={path} exact={exact} key={index} page={page} />;
  });
};

const PrivateRoute = ({ path, exact, page }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        isAuthenticated ? (
          page
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              search: `?redirect_to=${location.pathname}`,
              state: { referrer: location.pathname },
            }}
          />
        )
      }
    />
  );
};
