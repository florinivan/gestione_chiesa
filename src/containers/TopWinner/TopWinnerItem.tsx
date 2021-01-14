import React, { ReactElement } from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { useCurrentBreakpointName } from 'react-socks';

import { Text } from 'shared/atomic-ui/Text/Text';
import { TopWinnerModal } from 'shared/components/TopWinnerModal/TopWinnerModal';
import vincitoriDesktop from 'shared/images/vincitoriDesktop.svg';
import vincitoriMobileTablet from 'shared/images/vincitoriMobileTablet.svg';
import classNames from 'classnames';

import styles from 'containers/TopWinner/topWinner.module.scss';
import { DataPresentChurch } from 'commons/models/PresentMember';

interface TopWinnerItem {
  ranking: number;
  presentChurch: DataPresentChurch;
}

export const TopWinnerItem: React.FC<TopWinnerItem> = ({
  ranking,
  presentChurch
}): ReactElement => {
  const { formatMessage } = useIntl();
  const [openModal, setOpenModal] = React.useState(false);
  const [rankingModal, setRankingModal] = React.useState(0);
  const [topWinnerToModal, setTopWinnerToModal] = React.useState<DataPresentChurch>();
  const handleHide = React.useCallback(() => setOpenModal(false), []);
  const openModalHandler = () => {
    setOpenModal(!openModal);
    setTopWinnerToModal(presentChurch);
    setRankingModal(ranking);
  };
  const breakpoint = useCurrentBreakpointName();
  const isDesktop = breakpoint.includes('desktop');
  const backgroundImage = isDesktop
    ? `url("${vincitoriDesktop}")`
    : `url("${vincitoriMobileTablet}")`;
  const padding = classNames('d-flex ', isDesktop ? ' ' : 'pl-1');
  const lowerCaseCss = classNames('pr-1', styles.lowerCase);
  const titleModal = formatMessage({ id: 'fr.containers.TopWinner.Title' });
  return (
    <>
      <div
        className={styles.containerItem}
        style={{
          backgroundImage: backgroundImage
        }}>
        <div className={styles.leftContainer}>
          <div className={styles.ranking}>
            <Text as="p" size="text-16" bold>
              {ranking}
            </Text>
          </div>
          <div className={padding}>
            <Text as="p" size="text-12" bold>
              <span className={lowerCaseCss}>{presentChurch.getDayName()}</span>
              <span className={lowerCaseCss}>{presentChurch.getdateDayFormat()}</span>
            </Text>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.labelContainer}>
            <Text as="p" size="text-12" className={styles.amountWinning}>
              <span className={styles.label}>
                <FormattedMessage id="fr.containers.table.number.person" />
              </span>
              {presentChurch.presents != null && (
                <FormattedNumber value={+presentChurch.presents.length} />
              )}
            </Text>
          </div>
          <div>
            <Text
              as="p"
              size="text-10"
              bold
              className={styles.discoverHow}
              onClick={openModalHandler}>
              <FormattedMessage id="fr.containers.TopWinner.label.discoverHow" />
            </Text>
          </div>
        </div>
      </div>
      {topWinnerToModal && (
        <TopWinnerModal
          show={openModal}
          colorTitle="text-white"
          colorIcon="white"
          onHide={handleHide}
          title={titleModal}
          datePresent={topWinnerToModal}
          ranking={rankingModal}
        />
      )}
    </>
  );
};
