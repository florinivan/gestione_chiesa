import React from 'react';
import { Observable } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { useSelector } from 'shared/hooks/useSelector';

export function useGetConfigValue<S, K extends keyof S>(
  config$: Observable<S>,
  key: K,
  defaultValue: S[K],
  compare?: (x: S[K], y: S[K]) => boolean
) {
  const obsRef = React.useRef<Observable<S[K]> | null>(null);
  const keyRef = React.useRef(key);

  if (obsRef.current === null || key !== keyRef.current) {
    obsRef.current = config$.pipe(pluck(key), distinctUntilChanged(compare));
    keyRef.current = key;
  }

  return useSelector(obsRef.current, defaultValue);
}
