import React from 'react';
import './App.css';
import { BreakpointProvider } from 'react-socks';
import { IntlProvider } from 'react-intl';

const App: React.FC<{}> = function App() {
  //const history = useHistory();
  //const pathname = useLocation().pathname;
  const locale = `it-IT`; //process.env.REACT_APP_LANG_FR;
  return (
    <IntlProvider locale={locale}>
      <BreakpointProvider>
        <></>
      </BreakpointProvider>
    </IntlProvider>
  );
};
export default App;
