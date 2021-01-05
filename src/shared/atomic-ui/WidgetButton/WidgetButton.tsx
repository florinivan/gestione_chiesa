import React from 'react';
import classNames from 'classnames';

import { Button } from 'shared/atomic-ui/Button/Button';
import { Text } from 'shared/atomic-ui/Text/Text';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { useCurrentBreakpointName } from 'react-socks';

import styles from 'shared/atomic-ui/WidgetButton/widgetButton.module.scss';

export type ButtonType = 'infoMatch' | 'statistics' | 'streaming';
interface WidgetButtonProps {
  label: string;
  activeItem: string;
  activeButton: (index: ButtonType) => void;
  onclick?: () => void;
  index: ButtonType;
  mobile: boolean;
}

export const WidgetButton: React.FC<WidgetButtonProps> = React.memo(
  ({ label, activeButton, index, activeItem, mobile, onclick }) => {
    const breakpoint = useCurrentBreakpointName();
    const isMobileDown = breakpoint === 'zero';
    const isActive = activeItem === index;
    const activeIcon = isActive ? 'Arrow-Up' : 'Arrow-Down';
    const colorActiveIcon = isActive ? 'black-blue' : 'light-green';
    const colorActiveText = isActive ? 'text-black-blue' : 'text-light-green';
    const textActive = isActive && 'bold';
    const classRow = classNames(
      styles.widgetButton,
      mobile && styles.mobile,
      isActive && 'bg-light-green',
      styles.noHover,
      isMobileDown && styles.mobileDown,
      'd-flex align-items-center justify-content-center mx-1 px-0'
    );

    return (
      <Button className={classRow} variant="outline-primary" onClick={() => activeButton(index)}>
        <div className="d-flex align-items-center" onClick={onclick}>
          <Text
            as="p"
            size={isMobileDown ? 'text-10' : 'text-12'}
            bold
            className={`${styles.buttonLabel} ${textActive} ${colorActiveText}`}>
            {label}
          </Text>
          <div className="d-flex flex-column iconContainer w-auto">
            <NewIcon
              color={colorActiveIcon}
              size={mobile ? 'icon-size-18' : 'icon-size-22'}
              name={activeIcon}
              className="d-flex"
            />
          </div>
        </div>
      </Button>
    );
  }
);
