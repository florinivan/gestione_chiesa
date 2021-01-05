import { Observable } from 'rxjs';
import Config from 'shared/configuration';

import getCookie, { createCookie$ } from 'shared/utils/utilityCookie';

export default function getCookieJWT() {
  return getCookie(Config.COOKIE_JWT_KEY);
}

export function createCookieJWT$(): Observable<string | undefined> {
  return createCookie$(Config.COOKIE_JWT_KEY);
}
