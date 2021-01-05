import React from 'react';
import classNames from 'classnames';
import defaultFlag from 'shared/images/default_flag.png';

import styles from 'shared/atomic-ui/Flag/flag.module.scss';

type FlagType = FlagProps & JSX.IntrinsicElements['img']; // TODO spostare

interface FlagProps {
  className?: string;
}

/**
 * TODO remove "margin" css properties
 */
export const Flag: React.FC<FlagType> = React.memo(({ className, ...props }) => {
  const imgClassName = classNames(styles.container, className);
  return (
    <img
      {...props}
      className={imgClassName}
      alt={props.alt || ''}
      src={props.src ? props.src : defaultFlag}
    />
  );
});
