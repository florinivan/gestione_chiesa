import breakpoint from 'shared/styles/base/_breakpoint.scss';
import { trimEnd } from 'lodash';

const ENV = process.env;
/**
 * Default language
 */
const DEFAULT_LOCALE = 'it-IT';

/**
 *
 */
export const BROWSER_ROUTER_PREFIX = `${ENV.REACT_APP_BROWSER_ROUTER_PREFIX}`;

/**
 * Browser router paths
 */
export const BROWSER_ROUTER_PATH_MAP = {
  SHOWCASE_HOME: `${BROWSER_ROUTER_PREFIX}/`,
  MENUBOOK_ITEM: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_SHOWCASE_HMENU}`
};

/**
 * List of items' path
 */
const BROWSER_ROUTER_PATH_MENUBOOK = [BROWSER_ROUTER_PATH_MAP.MENUBOOK_ITEM];

/**
 * API base prematch & live
 */
const API_BASE = `${ENV.REACT_APP_API_BASE}`;

export const getBreakpointSizeFromScss = (text: string) => {
  return Number(trimEnd(text, 'px'));
};

/**
 * Break points
 */
const BREAK_POINTS: { [key: string]: number }[] = [
  { zero: getBreakpointSizeFromScss(breakpoint.zero) },
  { mobile: getBreakpointSizeFromScss(breakpoint.mobile) },
  { tablet: getBreakpointSizeFromScss(breakpoint.tablet) },
  { desktopLarge: getBreakpointSizeFromScss(breakpoint.desktopLarge) },
  { desktopXlarge: getBreakpointSizeFromScss(breakpoint.desktopXlarge) },
  { desktopXXlarge: getBreakpointSizeFromScss(breakpoint.desktopXXlarge) },
  { desktopXXXlarge: getBreakpointSizeFromScss(breakpoint.desktopXXXlarge) },
  { desktopXXXXlarge: getBreakpointSizeFromScss(breakpoint.desktopXXXXlarge) }
];

const MAX_MARKETS_GRID = {
  DESKTOP: 3,
  DESKTOP_XXXL: 4,
  DESKTOP_XXXXL: 5,
  MOBILE_TABLET: 3
};

const RESPONSE = {
  GAD_NUMBER: '15155'
};
const HOT_BETS_MAX_TIME_INTERVAL = 8 * 3600 * 1000; //8 hours in milliseconds
/**
 * default number of decimals on formatted numbers
 */
const DEFAULT_NUMBER_FORMAT_DECIMALS = 2;

// Maximum bet input we allow the user to type in.
// Values higher than `2^31 - 1` (java int max value) would cause
// the `giocataSistemisticaSviluppata` api to return
// a `400` (`java.lang.NumberFormatException`).
const MAX_BET_INPUT_THAT_CAN_BE_TYPED = 2 ** 31 - 3;

const HARD_CODED_MARKET_TYPE = [
  //(calcio, under/over, 2.5)
  {
    SPORT_ID: 1,
    MARKET_TYPE_ID: 7989,
    MARKET_ATTRIBUTE_ID: 250
  }
];

const EXT_PROVIDERS = {
  BETRADAR_ID: 21,
  BETGENIUS_ID: 22,
  SPORTING_SOLUTION_ID: 26
};

/**
 * Default intervals
 */
const DEFAULT_INTERVALS = {
  FETCH_CONFIG_PREMATCH: 60000,
  FETCH_CONFIG_LIVE: 30000,
  FETCH_CONFIG_SPECIAL: 60000,
  FETCH_SHAPE_PREMATCH: 60000,
  FETCH_SHAPE_LIVE: 3000,
  FETCH_SHAPE_SPECIAL: 60000,
  FETCH_TOP_LIVE: 3000,
  FETCH_LIVENOW: 3000,
  FETCH_TOP_PREMATCH: 60000,
  FETCH_LAST_MINUTE: 60000,
  FETCH_HOT_BETS: 60000,
  FETCH_HOT_BETS_HAS_LIVE: 3000,
  FETCH_CALENDAR: 10000,
  FETCH_MONO_SELECTION: 60000,
  FETCH_SHORTCUTS: 60000,
  FETCH_SPORTSBOOK: 60000,
  FETCH_LIVE_STREAMING: 60000,
  FETCH_REGULATOR_LIVE: 3000,
  FETCH_REGULATOR: 60000,
  FETCH_COMPETITION_DETAIL: 180000,
  FETCH_TICKET_STATUS: 3000,
  FETCH_TICKET_STATUS_LOWER_PRIORITY: 60_000,
  FETCH_TICKET_STATUS_LOWER_PRIORITY_INITIAL_DELAY: 20_000,
  FETCH_CONFIG_TICKET: 60000,
  FETCH_PENDING_TICKET_STATUS: 3000,
  FETCH_BETTING_COMPONENTS: 60000
};

/**
 * Ticket Params
 */
const TICKET_PARAMS = {
  MULTIPLE_DEFAULT_STAKE: 300,
  TICKET_SYSTEM_INTEGRAL: 2,
  TICKET_SYSTEM_VERTICAL: 1,
  TICKET_CHANNEL: Number(ENV.REACT_APP_TICKET_CHANNEL),
  TICKET_ACCEPT_VARIATION_AMOUNT: 1,
  TICKET_NOT_ACCEPT_VARIATION_AMOUNT: 0,
  MAX_SYSTEM_AMOUNT: 50000,
  SHOW_PRICE_VARIATION_ARROWS_TIMEOUT_MS: 3_000
} as const;

const LOCALSTORAGE_KEY_VERSION = 'v2';
/**
 * Ticket localstorage keys
 */
const TICKET_LOCALSTORAGE_KEY = {
  TICKET: `ticket/${LOCALSTORAGE_KEY_VERSION}`,
  PREDICTIONS_RECEIPT: `predictionsReceipt/${LOCALSTORAGE_KEY_VERSION}`,
  TICKET_SALE_RESULT: `ticketSaleResult/${LOCALSTORAGE_KEY_VERSION}`,
  BET_SETTING: `betSetting/${LOCALSTORAGE_KEY_VERSION}`,
  ACCEPTED_TICKET_SETTING: `acceptedTicketSetting/${LOCALSTORAGE_KEY_VERSION}`,
  ACCEPTION_VARIATION: `acceptionVariation/${LOCALSTORAGE_KEY_VERSION}`,
  AMOUNTS_BY_CARDINALITY: `amountsByCardinality/${LOCALSTORAGE_KEY_VERSION}`,
  TICKET_DRAFT_PREDICTION: `ticketDraftPrediction/${LOCALSTORAGE_KEY_VERSION}`,
  CURRENT_SELECTION_ERROR: `currentSelectionError/${LOCALSTORAGE_KEY_VERSION}`,
  MULTIPLE_STAKE_AMOUNT: `multipleStakeAmount/${LOCALSTORAGE_KEY_VERSION}`,
  TICKET_TYPE: `ticketType/${LOCALSTORAGE_KEY_VERSION}`,
  TICKET_LOCKED: `isTicketLocked/${LOCALSTORAGE_KEY_VERSION}`,
  BANKERS_STATUS_BY_PREDICTION_ID: `bankersPredictions/${LOCALSTORAGE_KEY_VERSION}`,
  TICKET_SALE_SETTINGS: `ticketSaleSettings/${LOCALSTORAGE_KEY_VERSION}`
} as const;

/**
 * Favourites competitions localstorage keys
 */
const FAVOURITES_COMPETITIONS_LOCALSTORAGE_KEY = {
  KEY: `favoriteCompetitionKeys/${LOCALSTORAGE_KEY_VERSION}`
};

/**
 * Reservation localstorage keys
 */
const RESERVATION_LOCALSTORAGE_KEY = {
  KEY: `reservations`
};

/**
 * Page scroll position localstorage keys
 */
const PAGE_SCROLL_POSITION_LOCALSTORAGE_KEY = {
  KEY: `pageScrollPositions`
};

/**
 * Search localstorage keys
 */
const SEARCH_LOCALSTORAGE_KEY = {
  KEY: `search/v2`
};

/**
 * Open search tab mobile localstorage keys
 */
const OPEN_SEARCH_TAB_MOBILE_LOCALSTORAGE_KEY = {
  KEY: `openSearchTabMobile/${LOCALSTORAGE_KEY_VERSION}`
};

/**
 * marketAttribute Dropdown localstorage keys
 */
const MARKET_ATTRIBUTE_DROPDOWN_LOCALSTORAGE_KEY = {
  KEY: `marketAttributeDropdownGlobal/${LOCALSTORAGE_KEY_VERSION}`
};

/**
 * selection Dropdown localstorage keys
 */
const SELECTION_DROPDOWN_LOCALSTORAGE_KEY = {
  KEY: `selectionDropdownGlobal/${LOCALSTORAGE_KEY_VERSION}`
};

/**
 * myLives localstorage keys
 */
const MY_LIVE_LOCALSTORAGE_KEY = {
  KEY: `myLives/${LOCALSTORAGE_KEY_VERSION}`
};
/**
 * grid template order localstorage keys
 */
const GRID_TEMPLATE_ORDER_LOCALSTORAGE_KEY = {
  KEY: `gridTemplate/order/${LOCALSTORAGE_KEY_VERSION}`
};

const POINT_OF_SALE_INFO_LOCAL_STORAGE_KEY = {
  KEY: `pointOfSale/${LOCALSTORAGE_KEY_VERSION}`
};

const TICKET_SALES_RESPONSE = {
  BET_TYPE_MULTIPLE: 0,
  BET_TYPE_VERTICAL_SYSTEM: 1,
  BET_TYPE_INTEGRAL_SYSTEM: 2
} as const;

/**
 * The `id` of the `HTMLElement` we mount our app on.
 *
 * @example ```typescript
 * ReactDOM.render(
 *   <App />,
 *   document.getElementById(APP_MOUNT_NODE_DOM_ID)
 * );
 * ```
 */
const APP_MOUNT_NODE_DOM_ID = 'root-betting';

/**
 * DOM ID of the fixed app navbar.
 */
const APP_FIXED_HEADER_DOM_ID = '1302766139';

/**
 * DOM id of the acceptance banner wrapper.
 */
const APP_TICKET_ACCEPTANCE_BANNER_DOM_ID = 'fr-betting-acceptance-banner';

// Relative path to recharge page and query string param for token
const RECHARGE_TARGET_URL = `${ENV.REACT_APP_RECHARGE_TARGET_URL}`;
const AUTH_TOKEN_PARAM = `${ENV.REACT_APP_AUTH_TOKEN_PARAM}`;
const LAST_MOVEMENTS_PAGE_RELATIVE_PATH = `${ENV.REACT_APP_LAST_MOVEMENTS_PAGE_RELATIVE_PATH}`;

// Balance trashold for streaming service
const BALANCE_TRASHOLD = 0;

// Provider label
const HTTP_PREFIX = 'http';
// Value for Widget Live services
const ID_PROVIDER_SPORTING_SOLUTION = 26;
const ID_PROVIDER_BETRADAR = 21;
const ID_PROVIDER_BETGENIUS = 22;
const SPORT_ID_CALCIO = 1;
const SPORT_ID_BASKET = 2;
const SPORT_ID_TENNIS = 3;
const BETGENIUS_SPORTS = [SPORT_ID_CALCIO, SPORT_ID_BASKET, SPORT_ID_TENNIS];

const BETGENIUS_LIVE_STATS_URL_PREFIX_LIST: { [key: string]: string } = {
  1: `${ENV.REACT_APP_BETBENIUS_1}`,
  2: `${ENV.REACT_APP_BETBENIUS_2}`,
  3: `${ENV.REACT_APP_BETBENIUS_3}`
};

const BETGENIUS_LIVE_STATS_URL_MOBILE_PREFIX_LIST: { [key: string]: string } = {
  1: `${ENV.REACT_APP_BETBENIUS_MOBILE_1}`,
  2: `${ENV.REACT_APP_BETBENIUS_MOBILE_2}`,
  3: `${ENV.REACT_APP_BETBENIUS_MOBILE_3}`
};

const BETGENIUS_LIVE_STATISTICS_URL_PREFIX_LIST: { [key: string]: string } = {
  1: `${ENV.REACT_APP_BETBENIUS_STATS_1}`,
  2: `${ENV.REACT_APP_BETBENIUS_STATS_2}`,
  3: `${ENV.REACT_APP_BETBENIUS_STATS_3}`
};

const COOKIE_JWT_KEY = 'JWT';

//Login cookies
const COOKIE_PLAYERID = 'playerId';
const COOKIE_PLAYERSESSION = 'playerSession';
const COOKIE_USERDATA = 'user_data';

//Login queryparameters
const PARAM_USERTOKEN = 'userToken';
const PARAM_ACCOUNTID = 'accountId';

//Top winner api params
const PARAM_CONCESSIONCODE = 'codiceConcessione';
const PARAM_CONCESSIONCODE_VALUE = 1;
const PARAM_PLATFORMCODE = 'codicePiattaforma';
const PARAM_PLATFORMCODE_VALUE = 0;
const PARAM_TYPEGAMECODE = 'codiceTipoGioco';
const PARAM_TYPEGAMECODE_VALUE = 2;
const PARAM_TYPESYSTEMCODE = 'codiceTipoSistema';
const PARAM_TYPESYSTEMCODE_VALUE_MULTIPLE = 0;
const PARAM_TYPESYSTEMCODE_VALUE_SYSTEM = 1;

const SEARCH_SETTINGS = {
  MIN_SEARCH_CHARACTERS: 3,
  DEFAULT_SEARCH_VALUE: ''
} as const;

/**
 * Initial value of the `configPrematch.enableReservation`:
 * A feature flag that disables `/reservations` page and
 * the whole reservation feature.
 */
const DEFAULT_ENABLE_RESERVATIONS_VALUE = true;

/**
 * Widgets route
 */
const WIDGETS_ROUTE = {
  TOP: `${BROWSER_ROUTER_PREFIX}`,
  RESERVATION: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_WIDGET_ROUTE_RESERVATION}`,
  TIPSTER: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_WIDGET_ROUTE_TIPSTER}`,
  SPECIALS: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_WIDGET_ROUTE_SPECIALS}`,
  SPORTSBOOK: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_WIDGET_ROUTE_SPORTSBOOK}`,
  SPORT: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_WIDGET_ROUTE_SPORT}`,
  QUOTE: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_WIDGET_ROUTE_QUOTE}`,
  EVENT: `${BROWSER_ROUTER_PREFIX}/${ENV.REACT_APP_WIDGET_ROUTE_EVENT}`
};

const SCROLL_TOP = {
  VISIBILITY_THRESHOLD: 100
} as const;

/**
 * Export
 */
const Config = {
  DEFAULT_LOCALE,
  LOCALES: [DEFAULT_LOCALE, 'en-UK'],
  MODE: ENV.REACT_APP_DEPLOY_MODE,
  BROWSER_ROUTER_PREFIX,
  BROWSER_ROUTER_PATH_MAP,
  BROWSER_ROUTER_PATH_MENUBOOK,
  API_BASE,
  BREAK_POINTS,
  DEFAULT_INTERVALS,
  MAX_MARKETS_GRID,
  RESPONSE,
  HOT_BETS_MAX_TIME_INTERVAL,
  DEFAULT_NUMBER_FORMAT_DECIMALS,
  TICKET_PARAMS,
  TICKET_LOCALSTORAGE_KEY,
  FAVOURITES_COMPETITIONS_LOCALSTORAGE_KEY,
  RESERVATION_LOCALSTORAGE_KEY,
  TICKET_SALES_RESPONSE,
  PAGE_SCROLL_POSITION_LOCALSTORAGE_KEY,
  SEARCH_LOCALSTORAGE_KEY,
  OPEN_SEARCH_TAB_MOBILE_LOCALSTORAGE_KEY,
  MARKET_ATTRIBUTE_DROPDOWN_LOCALSTORAGE_KEY,
  SELECTION_DROPDOWN_LOCALSTORAGE_KEY,
  POINT_OF_SALE_INFO_LOCAL_STORAGE_KEY,
  MY_LIVE_LOCALSTORAGE_KEY,
  GRID_TEMPLATE_ORDER_LOCALSTORAGE_KEY,
  APP_MOUNT_NODE_DOM_ID,
  APP_FIXED_HEADER_DOM_ID,
  APP_TICKET_ACCEPTANCE_BANNER_DOM_ID,
  MAX_BET_INPUT_THAT_CAN_BE_TYPED,
  HARD_CODED_MARKET_TYPE,
  EXT_PROVIDERS,
  RECHARGE_TARGET_URL,
  AUTH_TOKEN_PARAM,
  LAST_MOVEMENTS_PAGE_RELATIVE_PATH,
  BALANCE_TRASHOLD,
  ID_PROVIDER_SPORTING_SOLUTION,
  ID_PROVIDER_BETRADAR,
  ID_PROVIDER_BETGENIUS,
  SPORT_ID_CALCIO,
  SPORT_ID_BASKET,
  SPORT_ID_TENNIS,
  COOKIE_JWT_KEY,
  SEARCH_SETTINGS,
  HTTP_PREFIX,
  COOKIE_PLAYERID,
  COOKIE_PLAYERSESSION,
  COOKIE_USERDATA,
  PARAM_USERTOKEN,
  PARAM_ACCOUNTID,
  WIDGETS_ROUTE,
  DEFAULT_ENABLE_RESERVATIONS_VALUE,
  PARAM_CONCESSIONCODE,
  PARAM_CONCESSIONCODE_VALUE,
  PARAM_PLATFORMCODE,
  PARAM_PLATFORMCODE_VALUE,
  PARAM_TYPEGAMECODE,
  PARAM_TYPEGAMECODE_VALUE,
  PARAM_TYPESYSTEMCODE,
  PARAM_TYPESYSTEMCODE_VALUE_MULTIPLE,
  PARAM_TYPESYSTEMCODE_VALUE_SYSTEM,
  BETGENIUS_SPORTS,
  BETGENIUS_LIVE_STATS_URL_PREFIX_LIST,
  BETGENIUS_LIVE_STATS_URL_MOBILE_PREFIX_LIST,
  BETGENIUS_LIVE_STATISTICS_URL_PREFIX_LIST,
  SCROLL_TOP
};

export default Config;
