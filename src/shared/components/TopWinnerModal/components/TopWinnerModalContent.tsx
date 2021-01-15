import React from 'react';
import { FormattedMessage } from 'react-intl';

import { DataPresentChurch } from 'commons/models/PresentMember';
import { TopWinnerModalContentRow } from 'shared/components/TopWinnerModal/components/TopWinnerModalContentRow';
import classNames from 'classnames';

import styles from 'shared/components/TopWinnerModal/components/topWinnerModalContent.module.scss';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

interface TopWinnerModalContentProps {
  datePresent: DataPresentChurch;
}

export const TopWinnerModalContent: React.FC<TopWinnerModalContentProps> = ({ datePresent }) => {
  const classesMarketTitle = classNames(styles.contentTitle, styles.marketTitle);
  const classesQuote = classNames(styles.contentTitle, styles.quote);
  const eventTitle = classNames(styles.contentTitle, styles.event);

  return (
    <div className={styles.container}>
      <div className={styles.modalContentTitle}>
        <div className={eventTitle}>
          <FormattedMessage id="fr.containers.table.name" />
        </div>
        <div className={styles.containerHalfTitle}>
          <div className={classesMarketTitle}>
            <FormattedMessage id="fr.containers.table.number_childrens_14" />
            <NewIcon color="black" size="icon-size-20" name={'Arrow-Down'} />
          </div>
          <div className={classesQuote}>
            <FormattedMessage id="fr.containers.table.phone" />
          </div>
        </div>
      </div>
      <>
        <TopWinnerModalContentRow datePresent={datePresent.presents} />
      </>
    </div>
  );
};
