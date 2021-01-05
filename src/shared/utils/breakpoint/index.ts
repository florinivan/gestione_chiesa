import { BreakPoint } from 'commons/types';
import Config from 'shared/configuration';

export const getBreakpoint = (key: BreakPoint) => {
  return Config.BREAK_POINTS.filter((k: { [x: string]: any }) => k[key])[0][key];
};
