import { BreakPoint } from 'commons/types';
import Config from 'shared/configuration';

export const getBreakpoint = (key: BreakPoint) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Config.BREAK_POINTS.filter((k: { [x: string]: any }) => k[key])[0][key];
};
