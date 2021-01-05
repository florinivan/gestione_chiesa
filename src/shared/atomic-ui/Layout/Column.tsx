import React, { ReactElement } from 'react';
import classNames from 'classnames';

type NumberOfColumns = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
type Props = {
  xs?: NumberOfColumns;
  sm?: NumberOfColumns;
  md?: NumberOfColumns;
  lg?: NumberOfColumns;
  xl?: NumberOfColumns;
  xxl?: NumberOfColumns;
  xxxl?: NumberOfColumns;
  xxxxl?: NumberOfColumns;
  children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export const Column = React.memo(
  React.forwardRef<HTMLDivElement, Props>(function Column(
    { xs, sm, md, lg, xl, xxl, xxxl, xxxxl, className, children, ...rest },
    ref
  ): ReactElement {
    const cx = classNames({
      [`fr-col-${xs}`]: xs,
      [`fr-col-sm-${sm}`]: sm,
      [`fr-col-md-${md}`]: md,
      [`fr-col-lg-${lg}`]: lg,
      [`fr-col-xl-${xl}`]: xl,
      [`fr-col-xxl-${xxl}`]: xxl,
      [`fr-col-xxxl-${xxxl}`]: xxxl,
      [`fr-col-xxxxl-${xxxxl}`]: xxxxl,
      [`${className}`]: className
    });

    return (
      <div ref={ref} className={cx} {...rest}>
        {children}
      </div>
    );
  })
);
