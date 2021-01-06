import { fromEvent, Subscription, asyncScheduler } from 'rxjs';
import { throttleTime, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { Nullable } from 'commons/types';
import {
  getRootBettingOffsetTop,
  createHtmlResizeObservable,
  getFixedElementsHeightAboveRootBetting
} from 'services/BrowserInfoService/helpers';
import { browserInfoStore } from 'services/BrowserInfoService/BrowserInfoStore';

export class BrowserInfoService {
  private static instance: BrowserInfoService;

  private _windowScrollEventSubscription: Nullable<Subscription> = null;
  private _rootBettingOffsetTopSubscription: Nullable<Subscription> = null;

  static getInstance(): BrowserInfoService {
    if (!BrowserInfoService.instance) {
      BrowserInfoService.instance = new BrowserInfoService();
    }
    return BrowserInfoService.instance;
  }

  /**
   * Subscribe this service to updates to the window scroll.
   */
  subscribeToWindowScrollChanges(): Subscription {
    // Do not subscribe if a subscription is already present and is not closed.
    if (!this._windowScrollEventSubscription || this._windowScrollEventSubscription.closed) {
      this._windowScrollEventSubscription = fromEvent(window, 'scroll')
        .pipe(
          throttleTime(250, asyncScheduler, { leading: false, trailing: true }),
          tap(() => {
            browserInfoStore.scrollX$.next(window.scrollX ?? window.pageXOffset);
            browserInfoStore.scrollY$.next(window.scrollY ?? window.pageYOffset);
          })
        )
        .subscribe();
    }

    return this._windowScrollEventSubscription;
  }

  /**
   * Subscribes this service to update
   * - rootBettingOffsetTop$
   * - fixedElementsHeightAboveRootBetting$
   */
  subscribeToRootBettingOffsetTopChanges(): Subscription {
    // Do not subscribe if a subscription is already present and is not closed.
    if (!this._rootBettingOffsetTopSubscription || this._rootBettingOffsetTopSubscription.closed) {
      this._rootBettingOffsetTopSubscription = createHtmlResizeObservable()
        .pipe(
          throttleTime(150, asyncScheduler, { leading: false, trailing: true }),
          map(getRootBettingOffsetTop),
          distinctUntilChanged(),
          tap((offsetTop) => {
            browserInfoStore.rootBettingOffsetTop$.next(offsetTop);

            const current = browserInfoStore.fixedHeightAboveRootBetting$.getValue();
            const next = getFixedElementsHeightAboveRootBetting();

            if (current !== next) {
              browserInfoStore.fixedHeightAboveRootBetting$.next(next);
            }
          })
        )
        .subscribe();
    }

    return this._rootBettingOffsetTopSubscription;
  }
}
const browserInfoService = BrowserInfoService.getInstance();

export { browserInfoService };
