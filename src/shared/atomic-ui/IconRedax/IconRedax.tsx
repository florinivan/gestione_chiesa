import React from 'react';

import styles from 'shared/atomic-ui/IconRedax/iconRedax.module.scss';

interface IconRedaxProps {
  className?: string;
  hasBackgroundCircle?: boolean;
  src: string;
}

type IconRedaxType = IconRedaxProps & JSX.IntrinsicElements['img'];
export const IconRedax: React.FC<IconRedaxType> = React.memo(
  ({ className, hasBackgroundCircle, src, ...props }) => {
    return (
      <div className={hasBackgroundCircle ? styles.backgroundCircleCSS : ''}>
        <img
          className={`${className ? className : ''}`}
          alt={props.alt || ''}
          src={src}
          {...props}
        />
      </div>
    );
  }
);
