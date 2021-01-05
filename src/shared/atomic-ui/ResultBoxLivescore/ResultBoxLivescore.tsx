import React from 'react';
import styles from 'shared/atomic-ui/ResultBoxLivescore/resultBoxLivescore.module.scss';
import { Text } from 'shared/atomic-ui/Text/Text';

interface ResultBoxLivescoreProps {
  value?: number | undefined | string;
  isWinning?: boolean;
}

const { container: containerCSS, grow: growCSS, scorebold: boldCSS } = styles;

export const ResultBoxLivescore: React.FC<ResultBoxLivescoreProps> = React.memo(({ ...props }) => {
  const isBold = props.isWinning ? boldCSS : '';
  return props.value !== undefined ? (
    <div
      className={`${containerCSS} ${growCSS}  py-auto d-flex align-items-center justify-content-center px-1`}>
      <Text as="p" size="text-12" className={`${isBold}`}>
        {props.value}
      </Text>
    </div>
  ) : (
    <div className={`${containerCSS}`}></div>
  );
});
