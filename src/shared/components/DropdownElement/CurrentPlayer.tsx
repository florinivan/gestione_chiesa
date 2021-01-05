import React from 'react';
import { Text } from 'shared/atomic-ui/Text/Text';
import { PlayerDetails } from 'commons/models/PlayerDetails';

import team2 from 'shared/images/team2.svg';
import team1 from 'shared/images/team1.svg';

import styles from 'shared/components/DropdownElement/dropdown.module.scss';
import classNames from 'classnames';
import { useCurrentBreakpointName } from 'react-socks';

interface CurrentPlayerProps {
  playerDetails: PlayerDetails;
}
export const CurrentPlayer: React.FC<CurrentPlayerProps> = React.memo(props => {
  const { playerDetails } = props;
  const iconUrl = playerDetails.marketAttributeAggregatorGruop.iconUrl;
  const fallbackIconUrl = playerDetails.marketAttributeAggregatorGruop.home ? team1 : team2;
  const description = playerDetails.marketAttributeAggregator.description;
  const breakpoint = useCurrentBreakpointName();
  const isDesktop = breakpoint.includes('desktop');
  const dropdownTitleClass = classNames(
    !isDesktop ? styles.ellipsisMobile : styles.ellipsis,
    'ml-2 text-left',
    styles.dropdownFontSize,
    !isDesktop ? 'w-100 text-white' : 'text-white my-auto'
  );

  const jerseyBackground = [
    `url("${iconUrl}") no-repeat center`,
    `url("${fallbackIconUrl}") no-repeat center`,
    `white no-repeat center`
  ].join(', ');

  return (
    <div className={styles.headingWrapper}>
      <div className={styles.jersey} aria-hidden="true" style={{ background: jerseyBackground }} />
      <Text as={'p'} type="h6" bold className={dropdownTitleClass}>
        {description}
      </Text>
    </div>
  );
});
