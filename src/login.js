import './login.css';

import React, {useContext, createContext, useState} from 'react';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {
  faUserAlt,
  faLock,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Basic Login Page.
 * @constructor
 */
function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const {from} = location.state || {from: {pathname: '/'}};
  const login = (event) => {
    event.preventDefault();
    auth.signin(event.target.username.value, () => {
      history.replace(from);
    });
    return false;
  };

  return (
    <div className="hold-transition login-page">
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />

      <div className="login-box">

        <div className="login-logo">
          <b>Log</b>In
        </div>

        <div className="login-box-body card bg-secondary">
          <p className="login-box-msg">Enter any username/pass</p>

          <form onSubmit={login}>
            <div className="form-group has-feedback">
              <input type="text" className="form-control"
                placeholder="Username" name="username" />
              <Icon icon={faUserAlt} />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control"
                placeholder="Password" name="password" />
              <Icon icon={faLock} />
            </div>
            <div className="row">
              <div className="signin bg-light">
                <button type="submit" className="btn btn-block btn-flat cta">
                  <span> Log In</span><Icon icon={faSignInAlt} />
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}


/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

/**
 * Hook for child components to get the auth object
 * @constructor
 */
function useAuth() {
  return useContext(authContext);
}


/**
 * Provider hook that creates auth object and handles state
 * @constructor
 */
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (username, cb) => {
    return fakeAuth.signin(() => {
      setUser(username);
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
};

export {LoginPage, useProvideAuth, useAuth, authContext};
