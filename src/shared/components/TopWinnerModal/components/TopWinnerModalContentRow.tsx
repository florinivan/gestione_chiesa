import React from 'react';
import { useIntl } from 'react-intl';
import { useCurrentBreakpointName } from 'react-socks';

import { FeedBettingDetail } from 'commons/models/TopWinner';
import { Text } from 'shared/atomic-ui/Text/Text';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { getPredictionSelectionPrice } from 'containers/Ticket/utils/PredictionUtility';

import styles from 'shared/components/TopWinnerModal/components/topWinnerModalContent.module.scss';

interface TopWinnerModalContentRowProps {
  topWinnerBettingList?: FeedBettingDetail[];
}

export const TopWinnerModalContentRow: React.FC<TopWinnerModalContentRowProps> = ({
  topWinnerBettingList
}) => {
  const intl = useIntl();
  const breakpoint = useCurrentBreakpointName();
  const isDesktoporTablet = breakpoint.includes('desktop') || breakpoint === 'tablet';

  return (
    <>
      {topWinnerBettingList?.map((bList, index) => (
        <div key={index} className={styles.topWinnerRow}>
          <div className={styles.event}>
            <div className="d-flex">
              <Text as="p" size="text-10" color="text-grey" className="d-flex pl-1">
                {intl.formatMessage({
                  id: 'fr.shared.components.TopWinnerModal.TopwinnerModalContent.sportbook'
                })}
                {bList.programId} <span className="px-1">-</span>
                {intl.formatMessage({
                  id: 'fr.shared.components.TopWinnerModal.TopwinnerModalContent.avv'
                })}
                {bList.regulatorId}
              </Text>
            </div>
            <div className={styles.competition}>
              {bList.iconDisc ? (
                <img alt="competition" src={bList.iconDisc} className={styles.iconSport} />
              ) : (
                <NewIcon
                  size="icon-size-16"
                  name="Speciali"
                  color="grey"
                  className={styles.iconSport}
                />
              )}
              <span className={styles.descriptionCompetition}>{bList.descriptionCompetition}</span>
            </div>
            <div>
              <Text
                as="p"
                className="pl-1"
                size={isDesktoporTablet ? 'text-12' : 'text-11'}
                color="text-light-black">
                {bList.descriptionEvent}
              </Text>
            </div>
          </div>
          <div className={styles.containerHalfContent}>
            <div className={styles.marketBar}>
              <div className={styles.marketBarContent}>
                <Text as="p" size="text-12" color="text-black">
                  <span className="pr-1">{bList.descriptionMarketType}:</span>
                  {/* //if inserted remove the : above */}
                  {/* <span>{bList.marketTypeId} :</span> */}
                  <span className={styles.descriptionSelection}>
                    <span className="pr-1">{bList.descriptionSelection}</span>
                    <span>{bList.descriptionMarketAttribute}</span>
                  </span>
                </Text>
              </div>
            </div>
            <div className={styles.contentQuote}>
              <Text as="p" size="text-12" color="text-black" className="d-flex">
                {getPredictionSelectionPrice(bList.selectionPrice)}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
