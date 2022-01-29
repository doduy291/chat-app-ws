import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import GlobalLoading from './components/UI/GlobalLoading/index';
import Navigation from './components/Navigation/index';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

import { renderPrivateRoutes } from './configs/router.config';
import { getUserInfo } from './redux/actions/user.action';

const App = () => {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <>
      {!isLoading && (
        <BrowserRouter>
          <div className="chat-app">
            <Switch>
              {/* Get rid of trailing slash, e.g: /channel/ -> /channel */}
              <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
              <Route exact path={['/login', '/signup']}>
                <AuthPage />
              </Route>
              <Route exact path={['/channel', '/channel/:channelId', '/setting', '/contact', '/']}>
                <Navigation />
                <Suspense fallback={<GlobalLoading />}>
                  <Switch>{renderPrivateRoutes()}</Switch>
                </Suspense>
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
