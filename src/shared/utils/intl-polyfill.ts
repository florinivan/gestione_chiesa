import { shouldPolyfill as shouldPolyfillNumberFormat } from '@formatjs/intl-numberformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillDateTimeFormat } from '@formatjs/intl-datetimeformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillGetCanonicalLocales } from '@formatjs/intl-getcanonicallocales/should-polyfill';
import { shouldPolyfill as shouldPolyfillPluralRules } from '@formatjs/intl-pluralrules/should-polyfill';
import { Logger } from 'commons/utils/Logger';

export interface PolyfillCheck {
  api: string;
  polyfilled: boolean;
}

/**
 * Polyfills `Intl.NumberFormat` if necessary.
 * @param locales
 */
function polyfillIntlNumberFormatIfNecessary(
  locales: ReadonlyArray<string>
): Promise<PolyfillCheck> {
  const api = 'Intl.NumberFormat';
  if (!shouldPolyfillNumberFormat()) {
    return Promise.resolve({ api, polyfilled: false });
  }

  return import('@formatjs/intl-numberformat/polyfill')
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((Intl.NumberFormat as any).polyfilled) {
        const localeDataPolyfills: Promise<unknown>[] = [
          import('@formatjs/intl-numberformat/locale-data/en')
        ];

        if (locales.includes('it')) {
          localeDataPolyfills.push(import('@formatjs/intl-numberformat/locale-data/it'));
        }

        if (locales.includes('es')) {
          localeDataPolyfills.push(import('@formatjs/intl-numberformat/locale-data/es'));
        }

        return Promise.all(localeDataPolyfills);
      }

      return null;
    })
    .then(() => ({ api, polyfilled: true }));
}

/**
 * Polyfills `Intl.DateTimeFormat` if necessary.
 * @param locales
 */
function polyfillIntlDateTimeFormatIfNecessary(
  locales: ReadonlyArray<string>
): Promise<PolyfillCheck> {
  const api = 'Intl.DateTimeFormat';

  if (!shouldPolyfillDateTimeFormat()) {
    return Promise.resolve({ api, polyfilled: false });
  }

  // @see https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  let originalTimeZone: string | null = null;

  try {
    // We try to extract its value but we do not know if this api is in
    // this environment.
    originalTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (err) {
    Logger.error('polyfillIntlDateTimeFormatIfNecessary', 'originalTimeZone', err);
  }

  return import('@formatjs/intl-datetimeformat/polyfill')
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((Intl.DateTimeFormat as any).polyfilled) {
        const localeDataPolyfills: Promise<unknown>[] = [
          import('@formatjs/intl-datetimeformat/add-all-tz'),
          import('@formatjs/intl-datetimeformat/locale-data/en')
        ];

        if (locales.includes('it')) {
          localeDataPolyfills.push(import('@formatjs/intl-datetimeformat/locale-data/it'));
        }

        if (locales.includes('es')) {
          localeDataPolyfills.push(import('@formatjs/intl-datetimeformat/locale-data/es'));
        }

        return Promise.all(localeDataPolyfills);
      }

      return null;
    })
    .then(() => {
      // @see https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
      if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
        (Intl.DateTimeFormat as any).__setDefaultTimeZone(originalTimeZone || 'Europe/Rome');
      }

      return { api, polyfilled: true };
    });
}

/**
 * Polyfills `Intl.getCanonicalLocales` if necessary.
 */
function polyfillGetCanonicalLocalesIfNecessary(): Promise<PolyfillCheck> {
  const api = 'Intl.getCanonicalLocales';

  if (!shouldPolyfillGetCanonicalLocales()) {
    return Promise.resolve({ api, polyfilled: false });
  }

  return import('@formatjs/intl-getcanonicallocales/polyfill').then(() => ({
    api,
    polyfilled: true
  }));
}

/**
 * Polyfills `Intl.PluraleRules` if necessary.
 */
function polyfillPluralRulesIfNecessary(locales: ReadonlyArray<string>): Promise<PolyfillCheck> {
  const api = 'Intl.PluraleRules';

  if (!shouldPolyfillPluralRules()) {
    return Promise.resolve({ api, polyfilled: false });
  }

  return import('@formatjs/intl-pluralrules/polyfill')
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((Intl.PluralRules as any).polyfilled) {
        const localeDataPolyfills = [import('@formatjs/intl-pluralrules/locale-data/en')];

        if (locales.includes('it')) {
          localeDataPolyfills.push(import('@formatjs/intl-pluralrules/locale-data/it'));
        }

        if (locales.includes('es')) {
          localeDataPolyfills.push(import('@formatjs/intl-pluralrules/locale-data/es'));
        }
        return Promise.all(localeDataPolyfills);
      }

      return null;
    })
    .then(() => ({ api, polyfilled: true }));
}

/**
 * Adds to the environment all the necessary intl polyfills.
 * @see https://formatjs.io/docs/polyfills
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
export function polyfillIntlIfNecessary(locales: ReadonlyArray<string>): Promise<PolyfillCheck[]> {
  // e.g. `it-IT` -> 'it'
  // @see https://www.loc.gov/standards/iso639-2/php/code_list.php
  const localesConvertedToISO6391Format = locales
    .filter(Boolean)
    .map(r => r.replace(/[_-]\w+$/gi, ''));

  const intlPolyfillChecks = Promise.all([
    polyfillGetCanonicalLocalesIfNecessary(),
    polyfillPluralRulesIfNecessary(localesConvertedToISO6391Format),
    polyfillIntlNumberFormatIfNecessary(localesConvertedToISO6391Format),
    polyfillIntlDateTimeFormatIfNecessary(localesConvertedToISO6391Format)
  ]);

  intlPolyfillChecks.then(
    outcome => {
      Logger.info('intl', 'polyfill', { outcome, localesConvertedToISO6391Format, locales });
    },
    (reason: unknown) => Logger.error('intlPolyfillChecks', 'error', reason)
  );

  return intlPolyfillChecks;
}
