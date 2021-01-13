/* Regular
----------------*/
import { faClock as faClockRegular } from '@fortawesome/free-regular-svg-icons/faClock';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons/faSquare';

import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons/faStar';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons/faCommentDots';

import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import { faTrashAlt as faTrashAltRegular } from '@fortawesome/free-regular-svg-icons/faTrashAlt';

/* Brand
----------------*/
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons/faWhatsappSquare';
/* Solid
----------------*/
import { faStopwatch20 } from '@fortawesome/free-solid-svg-icons/faStopwatch20';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire';
import { faBolt } from '@fortawesome/free-solid-svg-icons/faBolt';
import { faTv } from '@fortawesome/free-solid-svg-icons/faTv';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar';
import { faPoll } from '@fortawesome/free-solid-svg-icons/faPoll';
import { faUnlink } from '@fortawesome/free-solid-svg-icons/faUnlink';
import { faBarcode } from '@fortawesome/free-solid-svg-icons/faBarcode';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { faShareAltSquare } from '@fortawesome/free-solid-svg-icons/faShareAltSquare';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faClock as faClockSolid } from '@fortawesome/free-solid-svg-icons/faClock';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons/faStar';
import { faCheckSquare as faCheckSquareSolid } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faSquare as faSquareSolid } from '@fortawesome/free-solid-svg-icons/faSquare';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faTrashAlt as faTrashAltSolid } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons/faPlaceOfWorship';

/* Regular
----------------*/
const REGULAR = [
  faClockRegular,
  faHeartRegular,
  faCheckSquare,
  faCommentDots,
  faSquareRegular,
  faStarRegular,
  faCalendarAlt,
  faFlag,
  faEye,
  faEyeSlash,
  faTrashAltRegular
];

/*Brand
----------------*/
const BRAND = [
  faTelegram,
  faFacebookF,
  faTwitter,
  faFacebookMessenger,
  faWhatsappSquare,
  faWhatsapp
];
/* Solid
----------------*/
const SOLID = [
  faStopwatch20,
  faStopwatch,
  faStarSolid,
  faFire,
  faBolt,
  faTv,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faLink,
  faSearch,
  faTimes,
  faChartBar,
  faPoll,
  faArrowUp,
  faArrowDown,
  faUnlink,
  faClockSolid,
  faHeartSolid,
  faExternalLinkAlt,
  faTrashAltSolid,
  faMapMarkerAlt,
  faCheckSquareSolid,
  faAngleDown,
  faAngleUp,
  faBarcode,
  faSquareSolid,
  faCaretDown,
  faMinus,
  faShareAltSquare,
  faShareAlt,
  faDownload,
  faPrint,
  faCaretUp,
  faPlaceOfWorship
];

/**
 *
 * @todo add icon, get from FontAwesome: https://fontawesome.com/icons?d=gallery&q=arrow
 */
export const ICON_LIBRARY = [...SOLID, ...REGULAR, ...BRAND];
