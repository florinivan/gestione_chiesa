import React, { HTMLAttributes, MouseEvent, MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';
import Config from 'shared/configuration';
import { NavLink, NavLinkProps, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import { Regulator } from 'commons/models/Regulator';
import { Text } from 'shared/atomic-ui/Text/Text';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { FullscreenModal } from 'shared/components/FullscreenModal/FullscreenModal';
import { Statistics } from 'shared/components/Statistics/Statistics';
import { useCurrentBreakpointName } from 'react-socks';
import styles from 'shared/components/DropdownElement/dropdown.module.scss';

export interface ToogleProps extends HTMLAttributes<HTMLDivElement> {
  isClickStyle: boolean;
  toBack?: NavLinkProps['to'];
  onBackClick?: MouseEventHandler;
  currentRegulator?: Regulator;
}

export const ToggleDropdown = React.forwardRef<HTMLDivElement, ToogleProps>(
  (
    {
      children,
      onClick,
      onBackClick,
      isClickStyle,
      'aria-expanded': isOpen,
      currentRegulator,
      toBack
    },
    ref
  ) => {
    const breakpoint = useCurrentBreakpointName();
    const isDesktop = breakpoint.includes('desktop');

    const isLive = currentRegulator?.isLive();
    const favoriteLive = useRouteMatch(Config.BROWSER_ROUTER_PATH_MAP.FAVORITE_LIVE);
    const isFavoriteLive = !!favoriteLive;

    const playerDetails = useRouteMatch(Config.BROWSER_ROUTER_PATH_MAP.PLAYER_DETAILS);
    const isPlayerDetails = !!playerDetails;

    const [show, setShow] = React.useState(false);
    function handleClick(domEvent: MouseEvent) {
      domEvent.preventDefault();
      domEvent.stopPropagation();

      setShow(!show);
    }

    const betradarId = currentRegulator?.getIdBetradarProvider([Config.EXT_PROVIDERS.BETRADAR_ID]);
    const intl = useIntl();
    const statisticsModalTitle = intl.formatMessage({
      id: 'fr.containers.statistics.modal.title'
    });

    const headerStyleClass = classNames(
      styles.headerDetail,
      isDesktop && !isClickStyle && styles.cursorDefault,
      'bg-dark-blue',
      isDesktop && 'pl-1'
    );
    const dropdownSectionTitleMobileClass = classNames(
      styles.navDropdownSectionTitleMobile,
      !isLive && 'pl-2',
      ' mr-0'
    );
    const dropdownTitleClass = classNames(
      !isDesktop ? styles.ellipsisMobile : styles.ellipsis,
      !isDesktop ? 'w-100 text-white' : 'text-white my-auto',
      styles.dropdownFontSize
    );

    const iconDisplayClass = classNames(
      !isDesktop && styles.navDropdownToggleIcon,
      isLive && (isClickStyle ? 'visible' : 'invisible'),
      !isLive && (isClickStyle ? 'd-block' : 'd-none'),
      'mr-1'
    );

    const navDropdownSectionTitleDesktop = classNames(
      styles.navDropdownSectionTitleDesktop,
      isFavoriteLive && ' pl-3'
    );
    return (
      <div
        className={headerStyleClass}
        ref={ref}
        onClick={e => {
          e.preventDefault();
          onClick?.(e);
        }}>
        {isDesktop ? (
          <div className={navDropdownSectionTitleDesktop}>
            {!isPlayerDetails ? (
              <Text bold as={'p'} className={dropdownTitleClass}>
                {children}
              </Text>
            ) : (
              <> {children}</>
            )}
          </div>
        ) : (
          <>
            <div className={`${styles.navDropdownBackIcon}`}>
              {toBack && (
                <NavLink to={toBack}>
                  <div className="iconContainer mr-1">
                    <NewIcon
                      className="d-flex"
                      color="white"
                      size="icon-size-24"
                      name="Arrow-Back"
                    />
                  </div>
                </NavLink>
              )}
              {!toBack && onBackClick && (
                <button
                  type="button"
                  className={classNames(styles.backButton, 'iconContainer', 'mr-1')}
                  onClick={onBackClick}>
                  <NewIcon className="d-flex" color="white" size="icon-size-24" name="Arrow-Back" />
                </button>
              )}
            </div>
            <div className={dropdownSectionTitleMobileClass}>
              {!isPlayerDetails ? (
                <Text as={'p'} type="h6" className={dropdownTitleClass}>
                  {children}
                </Text>
              ) : (
                <> {children}</>
              )}
            </div>
            {!isLive && !isPlayerDetails && (
              <div onClick={handleClick} className=" d-flex align-items-center mr-2">
                <NewIcon className="d-flex" color="white" size="icon-size-22" name="Statistics" />
                <FullscreenModal show={show} title={statisticsModalTitle}>
                  <Statistics id={betradarId} />
                </FullscreenModal>
              </div>
            )}
          </>
        )}
        <div className={iconDisplayClass}>
          <div className="d-flex flex-column iconContainer">
            <NewIcon
              color="white"
              size="icon-size-24"
              name={isOpen ? 'Arrow-Up' : 'Arrow-Down'}
              className="ml-1 mt-1 d-flex"
            />
          </div>
        </div>
      </div>
    );
  }
);
