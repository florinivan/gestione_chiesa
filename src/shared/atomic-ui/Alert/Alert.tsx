import React from 'react';
import classNames from 'classnames';

type AlertProps = {
  variant?: 'success' | 'warning' | 'error' | 'promo';
} & JSX.IntrinsicElements['div'];

export const Alert = React.memo(
  ({ children, className, variant = 'success', ...rest }: AlertProps) => {
    const colors = {
      success: 'message-alert-congratulation',
      warning: 'message-alert-warning',
      error: 'message-alert-no-successful',
      promo: 'bg-promo-alert-green'
    };

    const color: string = colors[variant];

    const classNamesBanner = classNames('alert message-alert fade show', color, className);

    return (
      <div className={classNamesBanner} {...rest} role="alert">
        {children}
      </div>
    );
  }
);
