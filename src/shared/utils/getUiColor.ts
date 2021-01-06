import { ColorsType } from 'commons/types';

import variables from 'shared/styles/base/_variables.scss';

export const getUiColor = (color?: ColorsType) => {
  return variables[color || 'black'];
};
