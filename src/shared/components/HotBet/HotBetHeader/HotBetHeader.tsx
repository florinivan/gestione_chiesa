import React from 'react';
import { Card } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import { Icon } from 'shared/atomic-ui/Icon/Icon';
import { Text } from 'shared/atomic-ui/Text/Text';
import { BackgroundColorsVariant } from 'commons/types';
import { IconRedax } from 'shared/atomic-ui/IconRedax/IconRedax';

import styles from 'shared/components/HotBet/HotBetHeader/hotBetHeader.module.scss';

interface HotBetHeaderProps {
  backgroundColor: BackgroundColorsVariant;
  team1IconUrl?: string;
  team2IconUrl?: string;
  team1: string;
  team2?: string;
  time?: string;
  timePosition?: 'right' | 'top';
  fontColor?: 'black' | 'white';
  borderDown?: boolean;
  sportIcon?: string;
  imgUrl?: string;
  onClick?: () => void;
}

export const HotBetHeader: React.FC<HotBetHeaderProps> = React.memo(
  ({
    backgroundColor,
    team1IconUrl,
    team2IconUrl,
    team1,
    team2,
    time,
    fontColor,
    timePosition,
    borderDown,
    sportIcon,
    imgUrl,
    onClick
  }) => {
    const hasTwoTeam = team1 && !!team2;
    const fontColorCSS = fontColor === 'white' ? styles.fontWhite : styles.fontBlack;

    let gameWidth = '';
    
    if (time && timePosition !== 'top') {
      gameWidth = styles.widthForTimeOnRight;
    }

    return (
      <Card.Header
        className={classNames(styles.hotBetHeaderWrapper, imgUrl ? styles.darkBackground : '')}
        onClick={onClick}>
        <div
          style={{
            backgroundImage: imgUrl ? `url(${imgUrl})` : ''
          }}
          className={classNames(
            styles.container,
            imgUrl ? styles.backgroundImg : backgroundColor,
            borderDown ? styles.borderDown : ''
          )}>
          {hasTwoTeam ? (
            <div className={classNames(styles.game, gameWidth, fontColorCSS)}>
              {time && timePosition === 'top' && (
                <div className={styles.timeOnTop}>
                  {sportIcon && (
                    <div className={styles.iconContainer}>
                      <Icon name={sportIcon} />
                    </div>
                  )}
                  <div className={styles.time}>
                    <Text as="p" size="text-12">
                      {time}
                    </Text>
                  </div>
                </div>
              )}
              <div className={classNames(styles.player, styles.paddingBottom)}>
                {team1IconUrl && (
                  <div className={styles.iconContainer}>
                    <IconRedax
                      hasBackgroundCircle={true}
                      src={team1IconUrl}
                      className={styles.teamIcon}
                    />
                  </div>
                )}
                <Text as="p" size="text-12" bold className={styles.ellipsis}>
                  {team1}
                </Text>
              </div>
              <div className={styles.player}>
                {team2IconUrl && (
                  <div className={styles.iconContainer}>
                    <IconRedax
                      hasBackgroundCircle={true}
                      src={team2IconUrl}
                      className={styles.teamIcon}
                    />
                  </div>
                )}
                <Text as="p" size="text-12" className={styles.ellipsis}>
                  {team2}
                </Text>
              </div>
            </div>
          ) : (
            <div className={classNames(styles.game, gameWidth, fontColorCSS)}>
              <Text as="p" size="text-12" className={styles.ellipsis}>
                {team1}
              </Text>
            </div>
          )}
          {time && timePosition !== 'top' && (
            <div className={classNames(styles.time, styles.timeOnRight)}>
              <Text as="p" size="text-10">
                {time}
              </Text>
            </div>
          )}
        </div>
      </Card.Header>
    );
  },
  isEqual
);
