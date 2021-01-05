import React from 'react';
import classNames from 'classnames';
import { Text } from 'shared/atomic-ui/Text/Text';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import styles from 'shared/atomic-ui/PredictionBanker/predictionBanker.module.scss';

interface PredictionBankerProps {
  isChecked: boolean;
  handleClick: () => void;
  ['data-qa']?: string;
  isTicketSaleAcceptedAndResultIsAReceipt: boolean;
}

export function PredictionBanker({
  isChecked,
  handleClick,
  ['data-qa']: dataQa,
  isTicketSaleAcceptedAndResultIsAReceipt
}: PredictionBankerProps) {
  const checkboxCSS = classNames(styles.checkBox, isChecked && styles.isActive);

  if (isTicketSaleAcceptedAndResultIsAReceipt && !isChecked) {
    return null;
  }

  return (
    <div
      data-qa={dataQa}
      className={styles.container}
      onClick={() => !isTicketSaleAcceptedAndResultIsAReceipt && handleClick()}>
      <div
        className={classNames(styles.bankerF, 'd-flex align-items-center justify-content-center')}>
        <Text as="p" bold size="text-10">
          F
        </Text>
      </div>
      {isTicketSaleAcceptedAndResultIsAReceipt && isChecked ? null : (
        <div className={checkboxCSS}>
          {isChecked && (
            <div className={styles.iconContainer}>
              <NewIcon size="icon-size-33" name="Check-box-Selected" color="medium-green" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
