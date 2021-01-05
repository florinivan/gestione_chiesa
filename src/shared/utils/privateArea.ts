import getCookieJWT from 'shared/utils/getCookieJWT';
import Config from 'shared/configuration';
import getCookie from 'shared/utils/utilityCookie';
import { UserData } from 'shared/hooks/useCookieUserData';

const country = process.env.REACT_APP_COUNTRY;
declare global {
  interface Window {
    mpu: (page: string) => void;
  }
}

export function isLogged() {
  const userData: UserData = getCookie(Config.COOKIE_USERDATA);

  switch (country) {
    case 'es':
      return userData.loggedIn ? true : false;
    default:
      return getCookieJWT() ? true : false;
  }
}

export function redirectToLoginPage() {
  switch (country) {
    case 'es':
      window.mpu('/login.html');
      break;

    default:
      // eslint-disable-next-line no-console
      console.log('redirect to login page');

      window.location.assign(
        `${process.env.REACT_APP_PRIVATE_AREA_BASE}/loginJwt/?endcallbackurl=${encodeURIComponent(
          window.location.href
        )}`
      );
  }
}

/**
 * Creates the link to the last movements page.
 * Do not use it directly in an `<a />`,
 * use `redirectToLastMovementsPage` instead.
 */
function getLastMovementsLink(): string {
  const lastMovementsPageLink = new URL(
    Config.LAST_MOVEMENTS_PAGE_RELATIVE_PATH,
    process.env.REACT_APP_PRIVATE_AREA_BASE
  );

  const authToken = getCookieJWT();

  if (authToken && typeof authToken === 'string') {
    lastMovementsPageLink.searchParams.set(Config.AUTH_TOKEN_PARAM, authToken);
  }

  return lastMovementsPageLink.href;
}

/**
 * Redirects user to the last movements page.
 * If the user is not uathenticated they'll be redirected to
 * the login page by the `lastMovementsPage`.
 */
export function redirectToLastMovementsPage() {
  const lastMovementsPage = getLastMovementsLink();

  window.location.href = lastMovementsPage;
}
