import React from 'react';
import { useIntl } from 'react-intl';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { Text } from 'shared/atomic-ui/Text/Text';

import styles from 'shared/atomic-ui/ShortcutSwitcher/shortcutswitcher.module.scss';

interface ShortcutSwitcherProps {
  isLive?: boolean;
  to: LinkProps['to'];
}
export const ShortcutSwitcher: React.FC<ShortcutSwitcherProps> = ({ isLive, to }) => {
  const className = classNames(
    styles.container,
    isLive ? 'btn btn-warning' : `live bg-gradient-blue-green text-black`
  );
  const translate = useIntl();

  return (
    <Link className={className} to={to}>
      <Text
        className={styles.shortcutSwitcherLabel}
        as="p"
        size="text-10"
        icon={
          isLive ? (
            <NewIcon size="icon-size-40" name="Prematch" color="white" />
          ) : (
            <NewIcon size="icon-size-40" name="Live" color="black" />
          )
        }
        iconPosition="top"
        bold>
        {isLive
          ? translate.formatMessage({
              id: 'fr.components.ShortcutSwitcher.prematch'
            })
          : translate.formatMessage({
              id: 'fr.components.ShortcutSwitcher.live'
            })}
      </Text>
    </Link>
  );
};
