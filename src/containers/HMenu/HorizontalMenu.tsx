import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCurrentWidth } from 'react-socks';
import { NavigationLink } from 'shared/atomic-ui/NavigationLink/NavigationLink';
import { Menu } from 'commons/models/Menu';
import { Text } from 'shared/atomic-ui/Text/Text';
import { AppHistoryLocationState } from 'shared/hooks/useHistoryState';
import { TopTabId } from 'containers/TabTop/config';
import { HorizontalScroll } from 'shared/components/HorizontalScroll/HorizontalScroll';
import { getBreakpoint } from 'shared/utils/breakpoint';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import variables from 'shared/styles/base/_variables.scss';
import styles from 'containers/HMenu/horizontalMenu.module.scss';

interface HorizontalMenuProps {
  current: Menu | undefined;
  listmenu: Menu[];
  getLinkTo(item: Menu): string;
  rightButton: React.ReactNode;
}

export function HorizontalMenu({ current, listmenu, getLinkTo, rightButton }: HorizontalMenuProps) {
  const width = useCurrentWidth();
  const location = useLocation<AppHistoryLocationState | undefined>();

  return (
    <div className={`${styles.wrapper}`}>
      <HorizontalScroll
        className="nav nav-tabs"
        animationTransition="smooth"
        removeActiveStyle
        removeIconAction={width < getBreakpoint('desktopLarge')}
        animationSpeed={2}
        activeElement={`link-${current?.key}`}
        backgroundColorStyle={variables['bg-light-grey']}
        scrollElementStep={3}>
        {listmenu?.map((item) => {
          if (!item) {
            return null;
          }

          const active = current?.key === item.key;
          const faColor = active ? 'medium-green' : 'invision-light-black';

          return (
            <div id={`link-${item.key}`} key={`link-${item.key}`} className={`nav-item `}>
              <NavigationLink
                className={`${styles.containerCounter} sisalNavLink `}
                as={Link}
                active={active}
                to={{
                  pathname: getLinkTo(item),
                  state: { ...location.state, selectedTopTabId: TopTabId.TopLive }
                }}>
                {
                  <Text
                    as="p"
                    bold={active}
                    size="text-12"
                    className={styles.textTransform}
                    icon={
                      <NewIcon
                        className="d-flex"
                        size="icon-size-36"
                        name={item.icon}
                        color={faColor}
                      />
                    }
                    iconPosition="top">
                    {item.label?.toLowerCase() || ''}
                  </Text>
                }
              </NavigationLink>
            </div>
          );
        })}
      </HorizontalScroll>

      <div className={`${styles.wrapperRightButton}`}>{rightButton}</div>
    </div>
  );
}
