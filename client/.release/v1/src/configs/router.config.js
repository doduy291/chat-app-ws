import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import Pages
import Login from '../containers/Auth/Login';
import Signup from '../containers/Auth/Signup';
import ChatEmpty from '../containers/Chat/ChatEmpty';
import ChatContent from '../containers/Chat/ChatContent';
const HomePage = React.lazy(() => import('../pages/HomePage'));
const ContactPage = React.lazy(() => import('../pages/ContactPage'));
const ChannelPage = React.lazy(() => import('../pages/ChannelPage'));
const SettingPage = React.lazy(() => import('../pages/SettingPage'));

// Route List
const routePublicList = [
  {
    path: '/login',
    exact: false,
    page: (isAuthenticated) => <Login isAuth={isAuthenticated} />,
  },
  {
    path: '/signup',
    exact: false,
    page: (isAuthenticated) => <Signup isAuth={isAuthenticated} />,
  },
];

const routePrivateList = [
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
    path: '/channel',
    exact: false,
    page: <ChannelPage />,
  },
  {
    path: '/',
    exact: true,
    page: <HomePage />,
  },
];

const routeSubChannelList = [
  {
    path: '/channel',
    exact: true,
    component: <ChatEmpty />,
  },
  {
    path: '/channel/:channelId',
    exact: true,
    component: <ChatContent />,
  },
];

// *********** Render Routes **********
// Public Routes
export const renderPublicRoutes = (isAuthenticated) => {
  return routePublicList.map((route, index) => {
    const { path, exact, page } = route;
    return <Route path={path} exact={exact} key={index} render={() => page(isAuthenticated)} />;
  });
};
// Private Routes
export const renderPrivateRoutes = () => {
  return routePrivateList.map((route, index) => {
    const { path, exact, page } = route;
    return <PrivateRoute path={path} exact={exact} key={index} page={page} />;
  });
};
// Sub Channel's Routes
export const renderSubChannelRoutes = () => {
  return routeSubChannelList.map((route, index) => {
    const { path, exact, component } = route;
    return <PrivateRoute path={path} exact={exact} key={index} page={component} />;
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
