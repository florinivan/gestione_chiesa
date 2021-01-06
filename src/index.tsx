import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'intersection-observer';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';

import { polyfillIntlIfNecessary } from 'shared/utils/intl-polyfill';
import * as serviceWorker from 'serviceWorker';
import App from 'containers/App/App';
import Config from 'shared/configuration';
import { Logger } from 'commons/utils/Logger';

require(`shared/styles/theme/${process.env.REACT_APP_COUNTRY}/main.scss`); //'import shared/styles/main.scss';

/**
 * Log current package.json version
 */
Logger.log('APP', 'Version', process.env.REACT_APP_VERSION);

/**
 * Define the mount node
 */
const MOUNT_NODE = document.getElementById(Config.APP_MOUNT_NODE_DOM_ID);

/**
 * Polyfills
 */
const render = function renderApp() {
  smoothscroll.polyfill();

  // @see https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration
  if (window.history?.scrollRestoration === 'manual') {
    window.history.scrollRestoration = 'auto';
  }

  return ReactDOM.render(
    <BrowserRouter basename={process.env.REACT_APP_BROWSER_ROUTER_BASE}>
      <App />
    </BrowserRouter>,
    MOUNT_NODE
  );
};

/**
 * Start the app
 */
polyfillIntlIfNecessary([navigator.language, process.env.REACT_APP_LANG_FR]).then(render, render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
