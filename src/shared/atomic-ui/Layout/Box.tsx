import React, { ReactElement } from 'react';
import classNames from 'classnames';

type Props = {
  type: 'container' | 'row';
  nogutters?: boolean;
  children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export const Box: React.FC<Props> = React.memo(
  ({ type, nogutters = false, className, children, ...rest }): ReactElement => {
    const cx = classNames(`fr-${type}`, {
      [`fr-nogutters`]: nogutters,
      [`${className}`]: className
    });

    return (
      <div className={cx} {...rest}>
        {children}
      </div>
    );
  }
);
