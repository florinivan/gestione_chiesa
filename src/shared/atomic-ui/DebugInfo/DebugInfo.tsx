import * as React from 'react';
import classNames from 'classnames';

import styles from 'shared/atomic-ui/DebugInfo/debugInfo.module.scss';

export default function DebugInfo({
  title = 'Debug information',
  className,
  children,
  ...rest
}: JSX.IntrinsicElements['details']) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <details className={classNames(styles.container, className)} {...rest}>
      <summary className={styles.title}>
        {title} <small className={styles.badge}>Not visible in production environment</small>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
