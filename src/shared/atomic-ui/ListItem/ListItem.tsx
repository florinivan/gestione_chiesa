import React from 'react';
import { RowProps } from 'react-bootstrap';
import classNames from 'classnames';

import { BackgroundColorsVariant } from 'commons/types';

import styles from 'shared/atomic-ui/ListItem/listItem.module.scss';

const { container: containerCSS } = styles;
interface ListItemProps {
  backgroundColor?: BackgroundColorsVariant;
  className?: string;
}

export const ListItem: React.FC<ListItemProps & RowProps & JSX.IntrinsicElements['div']> = ({
  backgroundColor = 'white',
  className,
  ...props
}) => {
  const classes = classNames(containerCSS, {
    [`${backgroundColor}`]: backgroundColor,
    [`${className}`]: className
  });

  return (
    <div className={classes} {...props}>
      {props.children}
    </div>
  );
};
