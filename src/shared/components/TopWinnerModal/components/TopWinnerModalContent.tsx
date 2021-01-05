import React from 'react';
import { useIntl } from 'react-intl';

import { TopWinner } from 'commons/models/TopWinner';
import { Text } from 'shared/atomic-ui/Text/Text';
import { TopWinnerModalContentRow } from 'shared/components/TopWinnerModal/components/TopWinnerModalContentRow';
import classNames from 'classnames';

import styles from 'shared/components/TopWinnerModal/components/topWinnerModalContent.module.scss';

interface TopWinnerModalContentProps {
  topWinner: TopWinner;
}

export const TopWinnerModalContent: React.FC<TopWinnerModalContentProps> = ({ topWinner }) => {
  const intl = useIntl();
  const classesMarketTitle = classNames(styles.contentTitle, styles.marketTitle);
  const classesQuote = classNames(styles.contentTitle, styles.quote);
  const eventTitle = classNames(styles.contentTitle, styles.event);

  return (
    <div className={styles.container}>
      <div className={styles.modalContentTitle}>
        <div className={eventTitle}>
          <Text as="p" color="text-white" size="text-12" bold>
            {intl.formatMessage({
              id: 'fr.shared.components.TopWinnerModal.TopwinnerModalContent.event'
            })}
          </Text>
        </div>
        <div className={styles.containerHalfTitle}>
          <div className={classesMarketTitle}>
            <Text as="p" color="text-white" size="text-12" bold>
              {intl.formatMessage({
                id: 'fr.shared.components.TopWinnerModal.TopwinnerModalContent.market'
              })}
            </Text>
          </div>
          <div className={classesQuote}>
            <Text as="p" color="text-white" size="text-12" bold>
              {intl.formatMessage({
                id: 'fr.component.BetsTable.quote'
              })}
            </Text>
          </div>
        </div>
      </div>
      <>
        <TopWinnerModalContentRow topWinnerBettingList={topWinner.bettingList} />
      </>
    </div>
  );
};
