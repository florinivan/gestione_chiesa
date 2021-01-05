import React from 'react';
import classNames from 'classnames';

import { setTextFormat } from 'shared/utils/setTextFormat';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { Text } from 'shared/atomic-ui/Text/Text';

import styles from 'shared/components/HotBet/HotBetSubheader/hotBetSubheader.module.scss';

export interface HotBetSubheaderProps {
  sportIconUrl?: string;
  competitionDescription?: string;
  macroDescription?: string;
  isLive?: boolean;
  isStreaming?: boolean;
  isOnDemand?: boolean;
  onClick?: () => void;
}

export const HotBetSubheader: React.FC<HotBetSubheaderProps> = React.memo(
  ({
    onClick,
    sportIconUrl,
    competitionDescription,
    isOnDemand,
    isLive,
    isStreaming,
    macroDescription
  }) => {
    const sporticonCss = classNames(isOnDemand ? 'mb-1' : '', styles.sportIcon);

    return (
      <div onClick={onClick} className={styles.subHeaderContainer}>
        <div className={styles.subHeaderContainer__competition}>
          <div className={styles.subHeaderContainer__competition__description}>
            <Text as="p" color="text-light-black" iconPosition="left" size="text-12">
              {competitionDescription}
            </Text>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            {isOnDemand && (
              <NewIcon
                //className="pr-1"
                size="icon-size-16"
                name="On-demand"
                color="invision-dark-blue-1"
              />
            )}
            {isLive && (
              <>
                <div className={`${styles.liveIcon} bg-live-green-blue`}></div>
                <div className="d-flex justify-content-center">
                  <Text as="p" size="text-10" color="text-light-black">
                    {setTextFormat('live')}
                  </Text>
                </div>
              </>
            )}
            {isStreaming && (
              <NewIcon
                className="pl-1 d-flex"
                size="icon-size-16"
                name="Streaming"
                color="invision-light-black"
              />
            )}
            <div className={sporticonCss}>
              <Text as="p" color="text-light-black" imageUrl={sportIconUrl} heightImage={16} />
            </div>
          </div>
        </div>
        <div onClick={onClick} className={styles.subHeaderContainer__macroDescription}>
          <Text size="text-10" color="text-grey" as="p">
            {macroDescription}
          </Text>
        </div>
      </div>
    );
  }
);
