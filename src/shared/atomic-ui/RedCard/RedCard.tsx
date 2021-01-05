import React from 'react';
import classNames from 'classnames';

import styles from 'shared/atomic-ui/RedCard/redCard.module.scss';

export const RedCard: React.FC<{}> = React.memo(() => {
  const classRow = classNames(styles.redCard, 'ml-1');
  return <div className={classRow}></div>;
});
