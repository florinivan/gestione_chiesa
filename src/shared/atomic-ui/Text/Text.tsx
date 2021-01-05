import React from 'react';
import classNames from 'classnames';

import { BackgroundColorsVariant, FontSizeType, TextColorsVariant } from 'commons/types';
import { Icon } from 'shared/atomic-ui/Icon/Icon';
import styles from 'shared/atomic-ui/Text/text.module.scss';

const {
  container: containerCSS,
  ['icon-top']: iconTopCSS,
  ['icon-top-container']: iconTopContainerCSS,
  ['icon-left-container']: iconLeftContainerCSS,
  ['icon-left']: iconLefCSS,
  bold: boldCSS
} = styles;

interface TextProps {
  as: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  iconUrl?: string;
  icon?: React.ReactNode;
  iconPosition?: 'top' | 'left';
  bold?: boolean;
  color?: TextColorsVariant;
  backgroundColor?: BackgroundColorsVariant;
  size?: FontSizeType;
  imageUrl?: string;
  heightImage?: number;
  ['data-qa']?: string;
}

type TextType = TextProps & JSX.IntrinsicElements['p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'];

export const Text: React.FC<TextType> = React.memo(function Text({
  as,
  type,
  size,
  color,
  backgroundColor,
  iconUrl,
  imageUrl,
  heightImage,
  icon,
  iconPosition,
  bold,
  ...props
}) {
  const Component: React.ElementType = as || 'p';

  const classes = classNames({
    [`${color}`]: color,
    [`${backgroundColor}`]: backgroundColor,
    [`${size}`]: size,
    [`${type}`]: type,
    [`${boldCSS}`]: bold,
    [`${props.className}`]: props.className
  });

  const iconPositionCss = classNames({
    [`${iconTopCSS}`]: iconPosition === 'top',
    [`${iconLefCSS}`]: iconPosition === 'left'
  });

  const renderIcon = () => {
    if (imageUrl) {
      return (
        <div className={iconPosition === 'top' ? iconTopContainerCSS : iconLeftContainerCSS}>
          <img src={imageUrl} alt="" height={heightImage} />
        </div>
      );
    } else {
      const ICON = icon ? icon : <Icon name={iconUrl} />;
      if (iconPosition === 'top') {
        return <div className={iconTopContainerCSS}>{ICON}</div>;
      } else {
        return ICON;
      }
    }
  };

  const Txt = () => (
    <Component {...props} className={`${classes}`}>
      {props.children}
    </Component>
  );

  return iconUrl || icon || imageUrl ? (
    <div className={`${containerCSS} ${iconPositionCss}`}>
      {renderIcon()}
      <Txt />
    </div>
  ) : (
    <Txt />
  );
});
