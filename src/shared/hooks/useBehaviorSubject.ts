import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { useObservable } from 'shared/hooks/useObservable';

export function useBehaviorSubject<T>(subject$: BehaviorSubject<T>): T {
  return useObservable(subject$, [subject$], subject$.getValue());
}
