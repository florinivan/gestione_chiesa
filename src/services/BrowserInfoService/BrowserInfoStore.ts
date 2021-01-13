import { BehaviorSubject } from 'rxjs';
import {
  getRootBettingOffsetTop,
  getFixedElementsHeightAboveRootBetting
} from 'services/BrowserInfoService/helpers';

export class BrowserInfoStore {
  private static instance: BrowserInfoStore;
  /**
   * `window.scrollY`
   */
  readonly scrollY$ = new BehaviorSubject<number>(0);

  /**
   * `window.scrollX`
   */
  readonly scrollX$ = new BehaviorSubject<number>(0);

  /**
   * Distance between top of and the viewport top.
   * It is generally covered by the `navbar` and other popups.
   */
  readonly rootBettingOffsetTop$ = new BehaviorSubject<number>(getRootBettingOffsetTop());

  /**
   * The sum of the height of fixed elements that are placed above
   * root betting.
   */
  readonly fixedHeightAboveRootBetting$ = new BehaviorSubject<number>(
    getFixedElementsHeightAboveRootBetting()
  );

  static getInstance(): BrowserInfoStore {
    if (!BrowserInfoStore.instance) {
      BrowserInfoStore.instance = new BrowserInfoStore();
    }
    return BrowserInfoStore.instance;
  }
}

export const browserInfoStore = BrowserInfoStore.getInstance();
