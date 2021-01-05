import React from 'react';
import Config from 'shared/configuration';
import { createCookie$, deleteCookie, setCookie } from 'shared/utils/utilityCookie';
import { useCookieUserData } from 'shared/hooks/useCookieUserData';
import { useRouteMatch } from 'react-router';

export function useSetCookieUserData() {
  const { userDataCookie, defaultUserDataCookie, isQueryStringParameters } = useCookieUserData();
  const isNotSpainEnv = process.env.REACT_APP_COUNTRY != 'es';
  const isMatchShowCase = useRouteMatch({
    path: `${Config.BROWSER_ROUTER_PATH_MAP.SHOWCASE_PREMATCH}`
  });
  if (isMatchShowCase?.isExact) {
    deleteCookie(Config.COOKIE_USERDATA);
  }

  React.useEffect(() => {
    const sc = () => {
      if (
        (!isMatchShowCase?.isExact && isQueryStringParameters) ||
        (isMatchShowCase?.isExact && isQueryStringParameters)
      ) {
        setCookie(Config.COOKIE_USERDATA, JSON.stringify(userDataCookie), { path: '/' });
      } else if (isMatchShowCase?.isExact) {
        setCookie(Config.COOKIE_USERDATA, JSON.stringify(defaultUserDataCookie), { path: '/' });
      }
    };
    if (isNotSpainEnv) {
      return;
    }
    const subscription = createCookie$(Config.COOKIE_USERDATA).subscribe(sc);
    return () => {
      subscription.unsubscribe();
    };
  }, [
    isNotSpainEnv,
    userDataCookie,
    isMatchShowCase?.isExact,
    isQueryStringParameters,
    defaultUserDataCookie
  ]);
}
