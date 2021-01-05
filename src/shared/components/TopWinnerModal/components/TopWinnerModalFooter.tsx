import React from 'react';
import { FormattedMessage } from 'react-intl';

import { TopWinner } from 'commons/models/TopWinner';
import classNames from 'classnames';
import { Text } from 'shared/atomic-ui/Text/Text';

import styles from 'shared/components/TopWinnerModal/topWinnerModal.module.scss';
import { FormattedMoney } from 'shared/components/FormattedMoney/FormattedMoney';

export interface TopWinnerModalFooterProps {
  topWinner: TopWinner;
}

export const TopWinnerModalFooter: React.FC<TopWinnerModalFooterProps> = ({ topWinner }) => {
  const columnLabel = classNames(styles.column, styles.label, 'pr-2');
  const columnValue = classNames(styles.column, styles.value);

  return (
    <div className={styles.topwinnerFooter}>
      <div className={columnLabel}>
        <div className="d-flex py-1">
          <Text color="text-black" size="text-12" as="p">
            <FormattedMessage id="fr.containers.TicketFooter.single.amountPlayed" />
          </Text>
        </div>
        {topWinner.bonusBaseNumber > 0 && (
          <div className="d-flex py-1">
            <Text color="text-black" size="text-12" as="p">
              <FormattedMessage id="fr.containers.TicketFooter.single.multipleBonus" />
            </Text>
          </div>
        )}
        <div className="d-flex py-1">
          <Text color="text-medium-green" size="text-12" as="p">
            <FormattedMessage id="fr.containers.TicketFooter.single.winningAmount" />
          </Text>
        </div>
      </div>
      <div className={columnValue}>
        <div className="d-flex py-1">
          <Text color="text-black" size="text-12" as="p" bold>
            <FormattedMoney value={+topWinner.amountPlayed} isBefore />
          </Text>
        </div>
        {topWinner.bonusBaseNumber > 0 && (
          <div className="d-flex py-1">
            <Text color="text-black" size="text-12" as="p" bold>
              <FormattedMoney value={+topWinner.bonusBaseNumber} isBefore />
            </Text>
          </div>
        )}
        <div className="d-flex py-1">
          <Text color="text-medium-green" size="text-12" as="p" bold>
            <FormattedMoney value={+topWinner.amountWinning} isBefore />
          </Text>
        </div>
      </div>
    </div>
  );
};
