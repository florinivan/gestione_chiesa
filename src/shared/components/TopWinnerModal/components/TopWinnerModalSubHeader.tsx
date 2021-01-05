import React from 'react';
import { useCurrentBreakpointName } from 'react-socks';
import { FormattedMessage } from 'react-intl';

import { TopWinner } from 'commons/models/TopWinner';
import { Text } from 'shared/atomic-ui/Text/Text';
import { FormattedMoney } from 'shared/components/FormattedMoney/FormattedMoney';
import classNames from 'classnames';
import vincitoriDesktop from 'shared/images/vincitoriDesktop.svg';
import vincitoriMobileTablet from 'shared/images/vincitoriMobileTablet.svg';

import styles from 'shared/components/TopWinnerModal/topWinnerModal.module.scss';

export interface TopWinnerModalSubHeaderProps {
  topWinner: TopWinner;
  ranking?: number;
}

export const TopWinnerModalSubHeader: React.FC<TopWinnerModalSubHeaderProps> = ({
  topWinner,
  ranking
}) => {
  const breakpoint = useCurrentBreakpointName();
  const isDesktop = breakpoint.includes('desktop');
  const amountPlayedCss = classNames(styles.amount, 'text-black');
  const amountWonCss = classNames(styles.amount, 'text-medium-green');
  const background = isDesktop ? `url("${vincitoriDesktop}")` : `url("${vincitoriMobileTablet}")`;
  const labelPlay = classNames(styles.label, styles.labelPlay);
  const containerAmountPlayed = classNames('d-flex', isDesktop ? 'pr-3' : 'pr-2');
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
            <span className={lowerCaseCss}>{topWinner?.name}</span>
            <span className={styles.firstletter}> {topWinner.lastName}</span>
          </Text>
          <div className={labelPlay}>
            <FormattedMessage id="fr.containers.TopWinner.label.play" />
          </div>
        </div>
        <div className={styles.containerAmount}>
          <div className={containerAmountPlayed}>
            <span className={amountPlayedCss}>
              {topWinner.amountPlayed != null && (
                <FormattedMoney value={+topWinner.amountPlayed} isBefore />
              )}
            </span>
          </div>
          <div className="d-flex pr-3">
            <span className={styles.label}>
              <FormattedMessage id="fr.containers.TopWinner.label.win" />
            </span>
            <span className={amountWonCss}>
              {topWinner.amountWinning != null && (
                <FormattedMoney value={+topWinner.amountWinning} isBefore />
              )}
            </span>
          </div>
          <div className="d-flex pr-2">
            <div className={styles.label}>
              <span className="d-flex">
                <FormattedMessage id="fr.shared.components.TopWinnerModal.sisalLabel" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
