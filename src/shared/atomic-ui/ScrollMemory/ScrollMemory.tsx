// Packages (if the file includes JSX then insert it as the first element)
import React from 'react';
// import { Route } from 'react-router';
// import { withRouter } from 'react-router-dom';

import {
  isBrowser,
  getScrollPage,
  getScrollElement,
  scrollTo,
  scrollToElement
} from 'shared/utils/scroll';

interface ScrollProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: Record<string, any>;
  elementID?: string;
}
const url: Map<string, number> = new Map();

export const ScrollMemory: React.FC<ScrollProps> = React.memo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props => {
    return null;
  },
  (prevProps, nextProps) => {
    if (!isBrowser()) {
      return false;
    }
    const { location } = prevProps;
    // location before change url
    const actual = location;
    // location after change url
    const next = nextProps.location;
    // the first page has not key, set "enter" for key
    const key = actual.key || 'enter';

    // if hash => let the normal operation of the browser
    const locationChanged =
      (next.pathname !== actual.pathname || next.search !== actual.search) && next.hash === '';

    // get scroll of the page or the element before change location
    const scroll = prevProps.elementID ? getScrollElement(prevProps.elementID) : getScrollPage();

    if (locationChanged) {
      // pass page or element scroll to top
      prevProps.elementID ? scrollToElement(0, prevProps.elementID) : scrollTo(0);
      // save scroll with key location
      url.set(key, scroll);
    }
    // never render
    return false;
  }
);
