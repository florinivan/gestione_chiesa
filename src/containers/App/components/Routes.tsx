import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Home } from 'pages/Home/Home';
import Config from 'shared/configuration';
import { HMenu } from 'pages/HMenu/HMenu';

export const Routes: React.FC<{}> = React.memo(function Routes() {
  return (
    <Switch>
      <Route path={Config.BROWSER_ROUTER_PATH_MAP.SHOWCASE_HOME} exact>
        <Home />
      </Route>
      <Route path={Config.BROWSER_ROUTER_PATH_MENUBOOK}>
        <HMenu />
      </Route>
      <Redirect to={Config.BROWSER_ROUTER_PATH_MAP.MENUBOOK_ITEM_PRESENT} />
    </Switch>
  );
});
