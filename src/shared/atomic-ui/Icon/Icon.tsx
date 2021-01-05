import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { ColorsType, IconSizeType } from 'commons/types';
import { ICON_LIBRARY } from 'shared/atomic-ui/Icon/iconLibrary';
import { getSisalUiColor } from 'shared/utils/getSisalUiColor';

import variables from 'shared/styles/base/_variables.scss';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
library.add(...(ICON_LIBRARY as any));
/**
 * @example
 */
/*
  sisal 
  <Icon name="arrow-forward" />

  font-awesome
  <Icon fa="coffee" />
  <Icon fa="coffee" faColor="green" faSize="lg" />
  <Icon fa="coffee" faColor="green" faSize="xs" />
  <Icon fa="chevron-right" faColor="green" faSize="1x" />
*/
interface FontAwesomeIconsProps extends Omit<FontAwesomeIconProps, 'icon'> {
  fa: IconName;
  faPrefix?: IconPrefix;
  faColor?: ColorsType;
  faSize?: FontAwesomeIconProps['size'];
  // faBackgroundColor?: ColorsType;
  faCustomSize?: IconSizeType;
}

type IconProps = {
  name?: string;
} & JSX.IntrinsicElements['i'];

const FaIcon: React.FC<FontAwesomeIconsProps> = ({
  fa,
  faColor,
  faSize,
  faPrefix,
  // faBackgroundColor,
  faCustomSize,
  ...props
}) => {
  const prefix = faPrefix || 'fas';

  const getIconSize = (size: IconSizeType) => {
    return variables[size];
  };

  return (
    <FontAwesomeIcon
      color={getSisalUiColor(faColor)}
      size={faSize || 'lg'}
      icon={[prefix, fa]}
      {...props}
      style={{
        // backgroundColor: faBackgroundColor && getSisalUiColor(faBackgroundColor),
        fontSize: faCustomSize && `${getIconSize(faCustomSize)}px`
      }}
    />
  );
};

export const Icon: React.FC<IconProps | FontAwesomeIconsProps> = props => {
  const faProps = props as FontAwesomeIconsProps;
  const { className, name, ...sisalIconProps } = props as IconProps;

  if (name && (faProps?.fa || faProps?.faColor || faProps?.faSize || faProps?.faPrefix)) {
    throw new Error(
      "Using the name property you will use the Sisal icons and you won't  be able to use the FontAwesome properties"
    );
  }

  if (faProps?.faSize && faProps?.faCustomSize) {
    throw new Error('You can only use one size property');
  }

  return faProps?.fa ? (
    <FaIcon {...faProps} />
  ) : (
    <i className={`icon-${name} ${className ? className : ''}`} {...sisalIconProps}></i>
  );
};

type NewIconProps = {
  name?: string;
  color?: ColorsType;
  size?: IconSizeType;
} & JSX.IntrinsicElements['i'];

export const NewIcon: React.FC<NewIconProps> = props => {
  const { className, name, color, size, ...sisalIconProps } = props;

  const getIconSize = (size?: IconSizeType) => {
    return size ? `${variables[size]}px` : '12px';
  };

  return (
    <i
      className={`icon-${name} ${className ? className : ''}`}
      style={{
        color: getSisalUiColor(color),
        fontSize: getIconSize(size)
      }}
      {...sisalIconProps}></i>
  );
};
