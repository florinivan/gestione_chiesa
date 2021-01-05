import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from 'shared/atomic-ui/BulletPoint/bulletPoint.module.scss';

export default function BulletPoint({ className, ...otherProps }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames(styles.bulletPoint, className)} {...otherProps} />;
}
