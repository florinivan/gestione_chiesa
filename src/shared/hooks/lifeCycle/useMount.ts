import { useEffectOnce } from 'shared/hooks/lifeCycle/useEffectOnce';

/**
 *
 * @param fn: () => void
 * @example useMount(() => alert('MOUNTED'));
 */
export const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};
