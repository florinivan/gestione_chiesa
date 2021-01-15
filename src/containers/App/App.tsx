import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BreakpointProvider, setDefaultBreakpoints } from 'react-socks';
import { useHistory } from 'react-router';
import { AppWrapper } from 'containers/App/components/AppWrapper';
import { getMessages } from 'shared/dictionary';
import { browserInfoService } from 'services/BrowserInfoService/BrowserInfoService';
import Config from 'shared/configuration';
import { utagView } from 'shared/utils/utag';

const App: React.FC<{}> = function App() {
  const history = useHistory();
  //const pathname = useLocation().pathname;
  const locale = process.env.REACT_APP_LANG_FR;
  const messages = getMessages(locale);

  setDefaultBreakpoints(Config.BREAK_POINTS);

  //const tokenJWT = getCookieJWT();

  React.useEffect(() => {
    const subscriptions = [
      browserInfoService.subscribeToWindowScrollChanges(),
      browserInfoService.subscribeToRootBettingOffsetTopChanges()
    ];
    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, []);

  /*React.useEffect(() => {
    if (!tokenJWT) {
      return;
    }
    const subscriptions = [openBetsService.fetchOpenBets(tokenJWT).subscribe()];
    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [tokenJWT]);*/

  // Track changes of dynamic url via the Histoy API of react router
  const firstRender = React.useRef(true);
  React.useEffect(() => {
    // On first render do not execute the call
    if (!firstRender.current) {
      utagView({ track_type: 'dynamic' });
    }
    firstRender.current = false;
  }, [history.location.pathname]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BreakpointProvider>
        <>
          <AppWrapper />
        </>
      </BreakpointProvider>
    </IntlProvider>
  );
};

export default App;
