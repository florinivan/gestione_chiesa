import React from 'react';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

type ComparatorFunc<T> = (x: T, y: T) => boolean;

/**
 * Returns an observable that emits whenever `value` changes
 * according to `distinctUntilChanged`.
 * An optional `comparatorFunc` can be provided and will be passed to
 * `distinctUntilChanged`.
 * @param value
 * @param comparatorFunc
 */
export default function useCreateObservableFrom<T>(
  value: T,
  comparatorFunc?: ComparatorFunc<T>
): Observable<T> {
  const subjectRef = React.useRef<{
    subject: BehaviorSubject<T>;
    observable: Observable<T>;
  } | null>(null);

  if (subjectRef.current === null) {
    const distinctUntilChangedOperator =
      typeof comparatorFunc === 'function'
        ? distinctUntilChanged<T>(comparatorFunc)
        : distinctUntilChanged<T>();

    const subject = new BehaviorSubject(value);
    subjectRef.current = {
      subject,
      observable: subject.pipe(distinctUntilChangedOperator)
    };
  } else {
    subjectRef.current.subject.next(value);
  }

  return subjectRef.current.observable;
}
