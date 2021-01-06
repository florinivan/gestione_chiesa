import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Home } from 'pages/Home/Home';
import Config from 'shared/configuration';

export const Routes: React.FC<{}> = React.memo(function Routes() {
  return (
    <Switch>
      <Route path={Config.BROWSER_ROUTER_PATH_MAP.SHOWCASE_PREMATCH} exact>
        <Home />
      </Route>
      <Redirect to={Config.BROWSER_ROUTER_PATH_MAP.SHOWCASE_PREMATCH} />
    </Switch>
  );
});
