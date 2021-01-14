import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import classNames from 'classnames';
import { DataPresentChurch } from 'commons/models/PresentMember';
import { Text } from 'shared/atomic-ui/Text/Text';

import styles from 'shared/components/TopWinnerModal/topWinnerModal.module.scss';

export interface TopWinnerModalFooterProps {
  datePresent: DataPresentChurch;
}

export const TopWinnerModalFooter: React.FC<TopWinnerModalFooterProps> = ({ datePresent }) => {
  const columnLabel = classNames(styles.column, styles.label, 'pr-2');
  const columnValue = classNames(styles.column, styles.value);

  return (
    <div className={styles.topwinnerFooter}>
      <div className={columnLabel}>
        <div className="d-flex py-1">
          <Text color="text-black" size="text-12" as="p">
            <FormattedMessage id="fr.containers.table.date" />
          </Text>
        </div>
        <div className="d-flex py-1">
          <Text color="text-medium-green" size="text-12" as="p">
            <FormattedMessage id="fr.containers.table.number.person" />
          </Text>
        </div>
      </div>
      <div className={columnValue}>
        <div className="d-flex py-1">
          <Text color="text-black" size="text-12" as="p" bold>
            {datePresent.getdateDayFormat()}
          </Text>
        </div>
        <div className="d-flex py-1">
          <Text color="text-medium-green" size="text-12" as="p" bold>
            <FormattedNumber value={+datePresent.presents.length} />
          </Text>
        </div>
      </div>
    </div>
  );
};
