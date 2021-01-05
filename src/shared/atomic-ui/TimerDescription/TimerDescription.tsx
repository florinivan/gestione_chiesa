import React from 'react';
import styles from 'shared/atomic-ui/TimerDescription/timerDescription.module.scss';
import { Text } from 'shared/atomic-ui/Text/Text';

const { 'timer-description': timerDescriptionCSS } = styles;

interface TimerDescriptionProps {
  upperRow: string;
  bottomRow: string;
  textColor: string;
  isCard?: boolean;
}

export const TimerDescription: React.FC<TimerDescriptionProps> = React.memo(({ ...props }) => {
  const borderRadius = props.isCard ? 'rounded-left' : '';
  const cardPositioning = props.isCard ? 'justify-content-end' : ' justify-content-center';
  const cardMarginBottom = props.isCard ? 'mb-2' : '';

  return (
    <div
      className={`${props.textColor} ${borderRadius} ${cardPositioning} ${timerDescriptionCSS} d-flex flex-column bg-black text-white px-1 `}>
      <div className={` ${cardMarginBottom}`}>
        <Text as="p" size="text-10">
          {props.upperRow}
        </Text>
        <Text as="p" size="text-10">
          {props.bottomRow}
        </Text>
      </div>
    </div>
  );
});
