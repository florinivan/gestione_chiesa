import React from 'react';
import classNames from 'classnames';
import { Button as BButton, ButtonProps as BButtonProps } from 'react-bootstrap';

import { ButtonVariantType } from 'shared/atomic-ui/Button/ButtonVariantType';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

import styles from 'shared/atomic-ui/Button/button.module.scss';

export type ButtonProps = Omit<BButtonProps & JSX.IntrinsicElements['button'], 'variant'> & {
  variant?: ButtonVariantType;
};

const ButtonBootstrapOverride = (BButton as unknown) as React.FC<ButtonProps>;

interface BtnProps extends ButtonProps {
  /**
   * width 100%
   */
  fluid?: boolean;
  /**
   * Icon right button
   */
  iconRight?: string | React.ReactNode;
  /**
   * Icon left button
   */
  iconLeft?: string | React.ReactNode;
  align?: 'left' | 'right' | 'center';
  /**
   * This property is used inside the sidebar
   */
  withCounter?: number;
  isLink?: boolean;
  target?: string;
}

export const Button = React.memo(
  React.forwardRef<HTMLButtonElement, BtnProps>(function Button(
    { fluid, iconLeft, iconRight, align = 'left', withCounter, isLink, ...props },
    ref
  ) {
    const isWithCounter = withCounter !== undefined;

    const classes = classNames(styles.resetPadding, {
      [`${styles.fluid}`]: fluid,
      [`${props.className}`]: props.className,
      [`${styles.cursor}`]: props.disabled
    });

    const alignClasses = classNames({
      [`${styles.alignLeft}`]: align === 'left',
      [`${styles.alignRight}`]: align === 'right',
      [`${styles.alignCenter}`]: align === 'center'
    });

    const renderIconLeft = () => {
      if (iconLeft) {
        if (typeof iconLeft === 'string') {
          return <NewIcon name={iconLeft} />;
        } else {
          return iconLeft;
        }
      }
    };
    const renderIconRight = () => {
      if (iconRight) {
        if (typeof iconRight === 'string') {
          return <NewIcon name={iconRight} />;
        } else {
          return iconRight;
        }
      }
    };
    const withIconComponent = (
      <ButtonBootstrapOverride {...props} ref={ref} className={classes}>
        <div className={styles.container}>
          <span className={styles.leftContainer}>
            {renderIconLeft()}
            {props.children}
          </span>

          {iconRight && renderIconRight()}
        </div>
      </ButtonBootstrapOverride>
    );

    const withCounterComponent = (
      <ButtonBootstrapOverride {...props} ref={ref} className={classes}>
        <div className={styles.container}>
          <span className={styles.leftContainer}>
            <span className={styles.counter}>2</span>
            {props.children}
          </span>
          {iconRight && renderIconRight()}
        </div>
      </ButtonBootstrapOverride>
    );

    const withLink = (
      <ButtonBootstrapOverride {...props} ref={ref} className={`${alignClasses} ${classes}`}>
        {props.children}
      </ButtonBootstrapOverride>
    );

    const normalComponent = (
      <ButtonBootstrapOverride {...props} ref={ref} className={`${alignClasses} ${classes}`}>
        {props.children}
      </ButtonBootstrapOverride>
    );

    if (isWithCounter) {
      return withCounterComponent;
    } else if (iconLeft || iconRight) {
      return withIconComponent;
    } else if (isLink) {
      return withLink;
    } else {
      return normalComponent;
    }
  })
);
