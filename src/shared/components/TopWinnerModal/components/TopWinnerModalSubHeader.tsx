import React from 'react';
import { useCurrentBreakpointName } from 'react-socks';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { Text } from 'shared/atomic-ui/Text/Text';
import classNames from 'classnames';
import vincitoriDesktop from 'shared/images/vincitoriDesktop.svg';
import vincitoriMobileTablet from 'shared/images/vincitoriMobileTablet.svg';

import { DataPresentChurch } from 'commons/models/PresentMember';
import styles from 'shared/components/TopWinnerModal/topWinnerModal.module.scss';

export interface TopWinnerModalSubHeaderProps {
  datePresent: DataPresentChurch;
  ranking?: string;
}

export const TopWinnerModalSubHeader: React.FC<TopWinnerModalSubHeaderProps> = ({
  datePresent,
  ranking
}) => {
  const breakpoint = useCurrentBreakpointName();
  const isDesktop = breakpoint.includes('desktop');
  const amountWonCss = classNames(styles.amount, 'text-medium-green');
  const background = isDesktop ? `url("${vincitoriDesktop}")` : `url("${vincitoriMobileTablet}")`;
  const lowerCaseCss = classNames('pr-1', styles.lowerCase);

  return (
    <>
      <div
        className={styles.topWinnerSubHeader}
        style={{
          backgroundImage: background
        }}>
        <div className={styles.containerRanking}>
          <Text as="p" color="text-black" bold size="text-14">
            {ranking}
          </Text>
        </div>
        <div className={styles.containerName}>
          <Text as="p" color="text-black" bold size="text-14">
            <span className={lowerCaseCss}>{datePresent.getDayName()}</span>
            <span className={lowerCaseCss}>{datePresent.getdateDayFormat()}</span>
          </Text>
        </div>
        <div className={styles.containerAmount}>
          <div className="d-flex pr-3">
            <span className={styles.label}>
              <FormattedMessage id="fr.containers.table.number.person" />
            </span>
            <span className={amountWonCss}>
              <FormattedNumber value={datePresent.getTotalPerson()} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
