import React from 'react';
import { Route, Switch } from 'react-router';

import { useCurrentBreakpointName } from 'react-socks';
import Sticky from 'react-stickynode';
import { Routes } from 'containers/App/components/Routes';
import { Divider } from 'shared/atomic-ui/Divider/Divider';
import Config from 'shared/configuration';
import { browserInfoStore } from 'services/BrowserInfoService/BrowserInfoStore';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';
import { Box } from 'shared/atomic-ui/Layout/Box';
import { Column } from 'shared/atomic-ui/Layout/Column';

import styles from 'containers/App/appwrapper.module.scss';
import { ScrollTop } from 'shared/components/ScrollTop/ScrollTop';

const AppWrapperComponent: React.FC<{}> = React.memo(
  function AppWrapper() {
    const fixedHeightAboveRootBetting = useBehaviorSubject(
      browserInfoStore.fixedHeightAboveRootBetting$
    );
    const breakpoint = useCurrentBreakpointName();

    const isDesktop = breakpoint.includes('desktop');

    const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
    const scrollTopLeftPositon = ref?.getBoundingClientRect().left;

    if (isDesktop) {
      return (
        <>
          <ScrollTop left={scrollTopLeftPositon} />
          <Sticky enabled={true} top={fixedHeightAboveRootBetting} innerZ={11}></Sticky>
          <Box type="container">
            <Box type="row">
              {
                <Column lg="9" className={`${styles.breadcrumbPaddingTop}`}>
                  <div>
                    <Switch>
                      <Route path={Config.BROWSER_ROUTER_PATH_MAP.FAVORITE_LIVE}></Route>
                      <Route path={Config.BROWSER_ROUTER_PREFIX_LIVE}></Route>
                      <Route path={Config.BROWSER_ROUTER_PATH_MAP.SPORT_RESERVATION} />
                      <Route path={Config.BROWSER_ROUTER_PREFIX_PREMATCH}></Route>
                    </Switch>
                  </div>
                  <div className={styles.bodyRowContainer}>
                    <Routes />
                  </div>
                </Column>
              }
              <Column ref={(ref) => setRef(ref)} lg="3" className={`${styles.sidebarContainer}`}>
                <Divider height="24px" />
              </Column>
            </Box>
          </Box>
        </>
      );
    }

    return (
      <>
        <ScrollTop isdesktop={false} />
        <Sticky enabled={true} top={fixedHeightAboveRootBetting} innerZ={11}></Sticky>
        {
          <div>
            <div>
              <Switch>
                <Route path={Config.BROWSER_ROUTER_PATH_MAP.FAVORITE_LIVE}></Route>
                <Route path={Config.BROWSER_ROUTER_PREFIX_LIVE}>
                  <Switch>
                    <Route
                      path={[
                        Config.BROWSER_ROUTER_PATH_MAP.SPORT_REGULATOR_LIVE_COUNTRY,
                        Config.BROWSER_ROUTER_PATH_MAP.SPORT_REGULATOR_LIVE
                      ]}
                    />
                    <Route path="*"></Route>
                  </Switch>
                </Route>
                <Route path={Config.BROWSER_ROUTER_PREFIX_PREMATCH}>
                  <Switch>
                    <Route
                      path={[
                        Config.BROWSER_ROUTER_PATH_MAP.SPORT_REGULATOR_PREMATCH_COUNTRY,
                        Config.BROWSER_ROUTER_PATH_MAP.SPORT_REGULATOR_PREMATCH
                      ]}
                      exact={true}
                    />
                    <Route path={Config.BROWSER_ROUTER_PATH_MAP.PLAYER_DETAILS} />
                    <Route path="*"></Route>
                  </Switch>
                </Route>
              </Switch>
            </div>
            <div className={styles.bodyRowContainer}>
              <Routes />
            </div>
          </div>
        }
      </>
    );
  },
  () => true
);

export const AppWrapper: React.FC<{}> = () => {
  return (
    <>
      <AppWrapperComponent />
    </>
  );
};
