import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GlobalLoading from './components/UI/GlobalLoading';
import Navigation from './components/Navigation/index';
import AuthPage from './pages/AuthPage';

import { renderPrivateRoutes } from './configs/router.config';
import NotFoundPage from './pages/NotFoundPage';

import { getUserInfo } from './redux/actions/user.action';

const App = () => {
  const [loading, setLoading] = useState(true); // Used to load the entire page
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(false);
    dispatch(getUserInfo());
    // return () => {};
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <BrowserRouter>
          <div className="chat-app">
            <Suspense fallback={<GlobalLoading />}>
              <Switch>
                <Route exact path={['/login', '/signup']}>
                  <AuthPage isAuth={isAuthenticated} />
                </Route>
                <Route exact path={['/', '/setting']}>
                  <Navigation />
                  <Switch>{renderPrivateRoutes(isAuthenticated)}</Switch>
                </Route>
                <Route path="*">
                  <Switch>
                    <Route component={NotFoundPage} />
                  </Switch>
                </Route>
              </Switch>
            </Suspense>
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
