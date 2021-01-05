import Cookies, { CookieChangeListener, CookieSetOptions } from 'universal-cookie';
import { Observable, concat, defer, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import once from 'lodash/once';

const getCookiesInstance = once(() => new Cookies());

export default function getCookie(nameCookie: string) {
  return getCookiesInstance().get(nameCookie);
}

export function setCookie(cookieName: string, cookieValue: string, option: CookieSetOptions) {
  return getCookiesInstance().set(cookieName, cookieValue, option);
}

export function deleteCookie(cookieName: string) {
  return getCookiesInstance().remove(cookieName);
}

export function createCookie$(nameCookie: string): Observable<string | undefined> {
  return concat(
    defer(() => of(getCookie(nameCookie))),
    new Observable<string | undefined>((subscriber) => {
      const updateSubscriber: CookieChangeListener = ({ name, value }) => {
        if (name === nameCookie) {
          subscriber.next(value);
        }
      };

      getCookiesInstance().addChangeListener(updateSubscriber);
      return () => {
        getCookiesInstance().removeChangeListener(updateSubscriber);
      };
    }).pipe(distinctUntilChanged())
  );
}
