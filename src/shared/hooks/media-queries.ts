import { useCurrentBreakpointName } from 'react-socks';
import { BreakpointRange } from 'commons/types';

/**
 * Returns the current breakpoint range `'mobile' | 'desktop' | 'tablet'`
 * the viewport is currently in.
 */
export function useGetBreakpointRange(): BreakpointRange {
  const breakpointName = useCurrentBreakpointName();

  let breakpointView: BreakpointRange;

  if (breakpointName === 'zero' || breakpointName === 'mobile') {
    breakpointView = 'mobile';
  } else if (breakpointName === 'tablet') {
    breakpointView = 'tablet';
  } else {
    breakpointView = 'desktop';
  }

  return breakpointView;
}
