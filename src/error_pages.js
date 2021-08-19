import './error_pages.css';

import React from 'react';
import {
  useLocation,
  Link,
} from 'react-router-dom';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle as faWarn,
  faBan,
} from '@fortawesome/free-solid-svg-icons';


/**
 * Basic 401 Page.
 * @constructor
 */
function NotFoundPage() {
  const location = useLocation();
  document.title = 'Not Found';

  return (
    <body className="hold-transition login-page" id="notfoundpage">
      <div className="area" >
        <ul className="circles">
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
          <li><Icon icon={faWarn} className="text-yellow" /></li>
        </ul>
      </div >

      <section className="content">
        <div className="error-page">

          <h2 className="headline text-yellow">404</h2>

          <div className="error-content">
            <br />
            <h3>
              <Icon icon={faWarn} className="text-yellow" />
              <b>Oops!</b> {location.pathname} not found.
            </h3>

            <p>
              We could not allow access to this page.
              You may not have privileges for this page.
              Please <Link to={{
                pathname: '/',
                state: {fromNotFound: true},
              }} className="text-yellow">return home</Link>.
            </p>

          </div>
        </div>
      </section>
    </body>
  );
};


/**
 * Basic 401 Page.
 * @constructor
 */
function AccessDeniedPage() {
  const location = useLocation();
  document.title = 'Access Denied';

  return (
    <body className="hold-transition login-page" id="accessdeniedpage">
      <div className="area" >
        <ul className="circles">
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
          <li><Icon icon={faBan} className="text-red" /></li>
        </ul>
      </div >

      <section className="content">
        <div className="error-page">

          <h2 className="headline text-red">401</h2>

          <div className="error-content">
            <br />
            <h3>
              <Icon icon={faBan} className="text-red" />
              You <b>cannot access</b> {location.pathname}.
            </h3>

            <p>
              We could not find this page.
              This page may not exist.
              Please <Link to={{
                pathname: '/',
                state: {fromAccessDenied: true},
              }} className="text-red">return home</Link>.
            </p>

          </div>
        </div>
      </section>
    </body>
  );
};

export {NotFoundPage, AccessDeniedPage};
