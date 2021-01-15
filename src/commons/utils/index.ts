import { Constructor } from 'commons/types';
import config from 'shared/configuration';

/**
 * params
 * date [JS Date()]
 * day_in_week [int] 1 (Mon) - 7 (Sun)
 */
export function nextWeekdayDate(date: Date, day_in_week: number) {
  const ret = new Date(date || new Date());
  ret.setDate(ret.getDate() + ((day_in_week - 1 - ret.getDay() + 7) % 7) + 1);
  return ret;
}

export const truncateWord = (word: string, truncateLength: number, ending = '...') =>
  word.length > truncateLength ? word.substring(0, truncateLength - ending.length) + ending : word;

export const toSeoPath = (word: string | undefined) => {
  const wordToReplace = word?.toLowerCase().replace(/[^A-Z0-9]+/gi, '-');

  if (wordToReplace?.startsWith('-')) {
    return wordToReplace.slice(1);
  } else if (wordToReplace?.endsWith('-')) {
    return wordToReplace.slice(0, -1);
  }

  return wordToReplace;
};

export const toCheckUrl = (url: string | undefined) =>
  url?.includes(config.HTTP_PREFIX) ? url : window.location.protocol + '//' + url;
/**
 * @param data      | Raw data from backend
 * @param Entity    | Client side model constructor
 * @return {Record<string, T>}
 */
export function generateEntity<R, T>(
  data: Record<string, R>,
  Entity: Constructor<R, T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any = null
) {
  return Object.keys(data).reduce((accumulator: Record<string, T>, key) => {
    accumulator[key] = new Entity(data[key], parent);
    return accumulator;
  }, {});
}

export function roundTo(value: number, places: number) {
  const power = Math.pow(10, places);
  return Math.round(value * power) / power;
}

export function floorTo(value: number, places: number) {
  const power = Math.pow(10, places);
  return Math.floor(value * power) / power;
}

export function truncateTo(value: number, places: number) {
  const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + places + '})?', 'g');

  const regexMatch = (value + '').match(reg);

  if (!regexMatch) {
    throw new TypeError(`truncateTo: invalid input provided: value "${value}", places "${places}"`);
  }

  const a = regexMatch[0];

  const dot = a.indexOf('.');
  if (dot === -1) {
    // integer, insert decimal dot and pad up zeros
    return parseFloat(a + '.' + '0'.repeat(places));
  }
  const b = places - (a.length - dot) + 1;
  return parseFloat(b > 0 ? a + '0'.repeat(b) : a);
}

export function getLocalizedNumberSeparator(locale: string, separatorType: 'group' | 'decimal') {
  const numberWithGroupAndDecimalSeparator = 1000.1;
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find((part) => part.type === separatorType)?.value;
}

export function localizedNumberFormat(
  locale: string,
  value: number,
  decimals = config.DEFAULT_NUMBER_FORMAT_DECIMALS
) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
    .format(value)
    .replace('€', '')
    .trim();
}

export function formatNumber(
  value: number,
  decimals = config.DEFAULT_NUMBER_FORMAT_DECIMALS,
  separator = '.'
) {
  return value.toFixed(decimals).replace('.', separator);
}

/**
 * Truncate number to "n" decimal places without rounding
 * @see{@link https://www.thetopsites.net/article/50810599.shtml}
 * @param value number/string to parse
 * @param decimals digits to fix
 */
export function toFixedTrunc(
  value: number | string,
  decimals = config.DEFAULT_NUMBER_FORMAT_DECIMALS
) {
  const v = (typeof value === 'string' ? value : value.toString()).split('.');
  if (decimals <= 0) {
    return v[0];
  }
  let f = v[1] || '';
  if (f.length > decimals) {
    return `${v[0]}.${f.substr(0, decimals)}`;
  }
  while (f.length < decimals) {
    f += '0';
  }
  return `${v[0]}.${f}`;
}

export function formatNumberWithoutRounding(
  value: number,
  decimals = config.DEFAULT_NUMBER_FORMAT_DECIMALS,
  separator = '.'
) {
  return toFixedTrunc(value, decimals).replace('.', separator);
}

export function formatMessage(message: string, params?: string[]) {
  let result = message;

  params?.forEach(
    (param, index) => (result = result.replace(new RegExp(`\\{${index}\\}`, 'g'), param))
  );

  return result;
}

/**
 * When doing float operations approximation errors are likely to happen,
 * passing the result to this function eliminates the error.
 * Be sure to use this function for each simple operation.
 *
 * example:
 *  - WRONG: floatify((0.1+0.2)*100)
 *  - RIGHT: flotify(floatify(0.1+0.2)*100)
 *
 * @param float
 */
export function floatify(float: number) {
  return parseFloat(float.toFixed(10));
}
