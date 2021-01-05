import React from 'react';
import { distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import isEqual from 'lodash/isEqual';

type useObservableType = {
  <T>(observable$: Observable<T>, dependencies: unknown[]): T | undefined;
  <T>(observable$: Observable<T>, dependencies: unknown[], initialValue: T): T;
};

export const useObservable: useObservableType = <T>(
  observable$: Observable<T>,
  dependencies: unknown[],
  initialValue?: T
) => {
  const [val, setVal] = React.useState(initialValue);

  React.useEffect(() => {
    const subscription = observable$
      .pipe(distinctUntilChanged(isEqual))
      .subscribe(value => setVal(value));
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return val;
};
