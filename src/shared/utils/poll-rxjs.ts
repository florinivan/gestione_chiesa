import { timer, Observable } from 'rxjs';
import { switchMapTo, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash/isEqual';

export interface PollOptions {
  /**
   * The initial delay time in milliseconds to wait before emitting the first value.
   */
  readonly initialDelayMs?: number;
}

const defaultConfig: Readonly<PollOptions> = {
  initialDelayMs: 0
};

/**
 * Operator that creates a polled version of the `source$` piped.
 * @param pollIntervalMs
 * @param options
 */
export function poll<T>(pollIntervalMs: number, options?: PollOptions) {
  const { initialDelayMs } = options ? { ...defaultConfig, ...options } : defaultConfig;

  return function createPolledObservable(source$: Observable<T>): Observable<T> {
    if (pollIntervalMs === 0) {
      return source$;
    }

    // @see https://rxjs-dev.firebaseapp.com/api/index/function/timer
    // @see https://rxjs-dev.firebaseapp.com/api/operators/distinctUntilChanged
    // @see https://rxjs-dev.firebaseapp.com/api/operators/switchMapTo
    return timer(initialDelayMs, pollIntervalMs).pipe(
      switchMapTo(source$),
      distinctUntilChanged(isEqual)
    );
  };
}
