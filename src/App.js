import 'admin-lte/dist/css/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {NotFoundPage, AccessDeniedPage} from './error_pages';
import {LoginPage, useProvideAuth, useAuth, authContext} from './login';

import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const Renderable = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.func,
]);


/**
 * Basic React App
 * Using faux auth and access based routes.
 * @constructor
 */
export default function App() {
  const auserCheck = ((authinfo) => {
    return authinfo.user ? authinfo.user.startsWith('a') : null;
  });

  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route exact path='/' component={HomePage} />
          <PrivateRoute path='/protected' component={ProtectedPage} />
          <PrivateRoute path='/auser'
            component={ProtectedPage}
            accessFunc={auserCheck}/>
          <Route path={['/401', '/denied']} component={AccessDeniedPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}

/**
 * Basic Home Page
 * @constructor
 */
function HomePage() {
  return <h3>Home</h3>;
};

/**
 * Provider component that wraps your app and makes auth object
 * @constructor
 */
function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};
ProvideAuth.propTypes = {
  children: Renderable,
};


/**
 * A wrapper that redirects to login page or acess denied page.
 * @constructor
 */
function PrivateRoute({children, component, accessFunc, ...rest}) {
  const auth = useAuth();
  const AccessiblePage = component;

  if (accessFunc === undefined) {
    accessFunc = ((authinfo) => {
      return authinfo.user !== null ? true : null;
    });
  };

  const getRenderable = ({location}) => {
    const access = accessFunc(auth);
    if (access === null) {
      return <Redirect
        to={{
          pathname: '/login',
          state: {from: location},
        }}
      />;
    };
    return access ? <AccessiblePage /> : <AccessDeniedPage />;
  };

  return (
    <Route
      {...rest}
      render={getRenderable}
    />
  );
};
PrivateRoute.propTypes = {
  children: Renderable,
  component: Renderable,
  accessFunc: PropTypes.func,
};


/**
 * Basic Protected Page
 * @constructor
 */
function ProtectedPage() {
  const history = useHistory();
  const auth = useAuth();

  return (
    <div>
      <h3>Protected</h3>
      Welcome to this page, {auth.user}!
      <button
        onClick={() => {
          auth.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </div>
  );
}
