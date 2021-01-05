/**
 * TYPES
 */
export type Nullable<T> = T | null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<R, T> = new (data: R, ...args: any[]) => T;
export type Keys = Record<string, string[]>;

export type WidgetBetRadarShowIn = 'competition' | 'regulator' | 'top_scores' | 'player';

/**
 * BREAKPOINT
 */

export type BreakPoint =
  | 'zero'
  | 'mobile'
  | 'tablet'
  | 'desktopLarge'
  | 'desktopXlarge'
  | 'desktopXXlarge'
  | 'desktopXXXlarge'
  | 'desktopXXXXlarge';

export type BreakpointRange = 'mobile' | 'tablet' | 'desktop';

/**
 * COLORS
 */

export type ColorsType =
  | 'white'
  | 'white-states-color'
  | 'black'
  | 'invision-light-black'
  | 'grey'
  | 'light-grey'
  | 'medium-grey'
  | 'invision-grey-1'
  | 'invision-light-grey-1'
  | 'invision-light-grey-2'
  | 'invision-light-grey-3'
  | 'invision-light-grey-4'
  | 'invision-light-grey-5'
  | 'invision-medium-grey'
  | 'invision-dark-grey'
  | 'dark-green'
  | 'medium-green'
  | 'light-green'
  | 'light-green-disabled'
  | 'light-green-disabled-light-mode'
  | 'success-green'
  | 'light-green-for-gradient'
  | 'blue'
  | 'dark-blue'
  | 'black-blue'
  | 'light-blue'
  | 'invision-dark-blue'
  | 'invision-dark-blue-1'
  | 'yellow'
  | 'yellow-for-gradient'
  | 'purple'
  | 'orange'
  | 'red'
  | 'pink'
  | 'orange-light-orange-gradient'
  | 'orange-pink-gradient'
  | 'blue-green-gradient'
  | 'blue-light-blue-gradient'
  | 'green-dark-green-gradient'
  | 'invision-white-gradient'
  | 'text-light-green'
  | 'blue-twitter'
  | 'blue-telegram'
  | 'blue-facebook'
  | 'blue-messenger'
  | 'green-whatsapp'
  | 'promo-alert-green'
  | 'invision-dark-blue-2'
  | 'invision-light-blue'
  | 'invision-dark-blue-3'
  | 'invision-light-blue-1';

/**
 * TYPOGRAPHY TYPES
 */

export type FontSizeType =
  | 'text-48'
  | 'text-40'
  | 'text-32'
  | 'text-24'
  | 'text-21'
  | 'text-16'
  | 'text-14'
  | 'text-11'
  | 'text-12'
  | 'text-10'
  | 'text-8';

/**
 * COLORS TYPES
 */

export type BackgroundColorsVariant =
  | 'bg-dark-green'
  | 'bg-medium-green'
  | 'bg-light-green'
  | 'bg-light-green-disabled'
  | 'bg-light-green-disabled-wm'
  | 'bg-dark-blue'
  | 'bg-black-blue'
  | 'bg-light-blue'
  | 'bg-spot-green'
  | 'bg-yellow'
  | 'bg-purple'
  | 'bg-orange'
  // | 'bg-light-grey'
  | 'bg-white'
  | 'bg-red'
  | 'bg-black'
  | 'bg-grey'
  | 'bg-gradient-orange-light-orange'
  | 'bg-gradient-orange-pink'
  | 'bg-gradient-blue-green'
  | 'bg-gradient-blue-light-blue'
  | 'bg-gradient-green-dark-green'
  // enrichment sisal
  | 'bg-blue'
  | 'bg-medium-grey'
  | 'bg-primary-light-green'
  | 'bg-promo-alert-green';

export type TextColorsVariant =
  | 'text-dark-green'
  | 'text-medium-green'
  | 'text-light-green'
  | 'text-light-green-disabled'
  | 'text-light-green-disabled-wm'
  | 'text-dark-blue'
  | 'text-black-blue'
  | 'text-light-blue'
  | 'text-spot-green'
  | 'text-yellow'
  | 'text-purple'
  | 'text-orange'
  | 'text-light-grey'
  | 'text-white'
  | 'text-red'
  | 'text-black'
  | 'text-light-black'
  | 'text-grey';

export type IconSizeType =
  | 'icon-size-1'
  | 'icon-size-2'
  | 'icon-size-9'
  | 'icon-size-10'
  | 'icon-size-11'
  | 'icon-size-6'
  | 'icon-size-12'
  | 'icon-size-13'
  | 'icon-size-14'
  | 'icon-size-15'
  | 'icon-size-16'
  | 'icon-size-18'
  | 'icon-size-20'
  | 'icon-size-22'
  | 'icon-size-24'
  | 'icon-size-26'
  | 'icon-size-28'
  | 'icon-size-33'
  | 'icon-size-36'
  | 'icon-size-40'
  | 'icon-size-64';

/**
 * INTERFACES
 */
