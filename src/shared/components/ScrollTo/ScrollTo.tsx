import { Logger } from 'commons/utils/Logger';
import React from 'react';

export interface ScrollToProps {
  /** Next `x` position, default `0` */
  x?: number;
  /** Next `y` position, default `0` */
  y?: number;
  /**
   * Default DOM id of the scrolled element.
   * If `scrollerDomId` is not provided it will scroll
   * window instead.
   */
  scrollerDomId?: string;
  /**
   * Uses `scrollTo` unless `scrollBy` flag is passed.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
   */
  scrollBy?: boolean;
}

function scrollElement(elem: HTMLElement, scrollToOptions: ScrollToProps) {
  const x = scrollToOptions.x || 0;
  const y = scrollToOptions.y || 0;

  if (scrollToOptions.scrollBy) {
    elem.scrollBy(x, y);
  } else {
    elem.scrollTo(x, y);
  }
}

/**
 * A component that on mount scrolls **once** an html element according to
 * the props privided.
 *
 * If no props are provided scrolls the page to top.
 *
 * Notes
 *
 * - it does not scroll when the user changes url via back button
 *   or indirectly when we trigger a `history.goBack()` or history.go(-1).
 *   It it intentional and it is used to comply to the current specs:
 *   https://jira.sisal.it:8443/browse/DS-15909
 * @param props
 */
export function ScrollTo(props: ScrollToProps) {
  const intialPropsRef = React.useRef(props);

  React.useLayoutEffect(() => {
    const scrollerDomId = intialPropsRef.current.scrollerDomId;

    if (typeof scrollerDomId !== 'string') {
      scrollElement(document.documentElement, intialPropsRef.current);
      return;
    }

    const scroller: HTMLElement | null = document.getElementById(scrollerDomId);

    if (scroller) {
      scrollElement(scroller, intialPropsRef.current);
    } else {
      Logger.error(
        'scrolling',
        'scrollTo',
        `i couldn't find an element with id "${scrollerDomId}"`
      );
    }
  }, []);

  return null;
}
