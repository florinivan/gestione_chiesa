import ResizeObserver from 'resize-observer-polyfill';
import { Observable } from 'rxjs';
import Config from 'shared/configuration';

/**
 * Computes the distance between `APP_MOUNT_NODE_DOM_ID` top and the viewport top.
 */
export function getRootBettingOffsetTop(): number {
  const moutNode = document.getElementById(Config.APP_MOUNT_NODE_DOM_ID);

  if (!moutNode) {
    // fallback desktop value.
    return 50;
  }

  return window.pageYOffset + moutNode.getBoundingClientRect().top;
}

/**
 * Computes the height of the fixed elements that are above root betting.
 * We use this value to compute the position of sticky elements.
 */
export function getFixedElementsHeightAboveRootBetting(): number {
  const fixedElementsAboveRootBetting = [
    document.getElementById(Config.APP_FIXED_HEADER_DOM_ID)
  ].filter((val: HTMLElement | null): val is HTMLElement => !!val);

  if (fixedElementsAboveRootBetting.length === 0) {
    // Use fallback desktop value.
    return 50;
  }

  let output = 0;

  for (let i = 0, len = fixedElementsAboveRootBetting.length; i < len; i++) {
    const fixedElement: HTMLElement = fixedElementsAboveRootBetting[i];

    output += fixedElement.offsetHeight;
  }

  return output;
}

/**
 * Creates an observable that returns the epoch time of the
 * latest `<html />` resize.
 */
export function createHtmlResizeObservable(): Observable<number> {
  return new Observable((subscriber) => {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (entries.length > 0) {
        subscriber.next(new Date().getTime());
      }
    });

    // Observes the `<html />` element height.
    resizeObserver.observe(document.documentElement);

    // cleanup
    return () => {
      // @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/disconnect
      resizeObserver.disconnect();
    };
  });
}
