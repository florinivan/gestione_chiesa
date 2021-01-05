import React, { MouseEvent, MouseEventHandler } from 'react';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useCurrentBreakpointName } from 'react-socks';
import { ToggleDropdown } from 'shared/components/DropdownElement/ToggleDropdown';
import { MenuDropdown } from 'shared/components/DropdownElement/MenuDropdown';
import { CurrentPlayer } from 'shared/components/DropdownElement/CurrentPlayer';
import { Regulator } from 'commons/models/Regulator';
import { NavLinkProps } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { MenuModal } from './MenuModal';
import { PlayerDetails } from 'commons/models/PlayerDetails';

import styles from 'shared/components/DropdownElement/dropdown.module.scss';

interface DropdownCustomProps {
  isClickStyle: boolean;
  currentRegulator: Regulator;
  toBack?: NavLinkProps['to'];
  onBackClick?: MouseEventHandler;
  children: React.ReactNode;
  playerDetails?: PlayerDetails;
}

export const DropdownCustom: React.FC<DropdownCustomProps> = React.memo(
  ({ isClickStyle, currentRegulator, toBack, children, onBackClick, playerDetails }) => {
    const breakpoint = useCurrentBreakpointName();
    const isDesktop = breakpoint.includes('desktop');

    const isPlayerDetails = !!playerDetails;

    const handleBackClick = (domEvent: MouseEvent) => {
      domEvent.preventDefault();
      domEvent.stopPropagation();

      onBackClick?.(domEvent);
    };

    const dropdownMenuClass = classNames(
      styles.dropdownMenu,
      isDesktop ? 'w-50 ' : 'w-100 ',
      isDesktop && styles.dropdownMenuDesktop,
      'mt-0'
    );

    const dropdownContainer = classNames(
      isDesktop || (isPlayerDetails && 'w-100 desktop'),
      'dropdown-container'
    );
    const oldCurrentRegulator = React.useRef(currentRegulator);
    const [showModalMenu, setShowModalMenu] = React.useState(false);
    const handleClose = () => setShowModalMenu(false);
    React.useEffect(() => {
      if (
        showModalMenu &&
        !isEqual(oldCurrentRegulator.current.description, currentRegulator.description)
      ) {
        oldCurrentRegulator.current = currentRegulator;
        handleClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRegulator]);

    const DropdownDescription = !playerDetails ? (
      <>{currentRegulator.description}</>
    ) : (
      <CurrentPlayer playerDetails={playerDetails} />
    );

    if (isDesktop) {
      return (
        <Dropdown id="custom-dropdown" className={dropdownContainer}>
          <Dropdown.Toggle
            as={ToggleDropdown}
            id="dropdown-toggle-custom"
            isClickStyle={isClickStyle}
            toBack={toBack}
            onBackClick={handleBackClick}
            currentRegulator={currentRegulator}>
            {DropdownDescription}
          </Dropdown.Toggle>
          <Dropdown.Menu as={MenuDropdown} className={dropdownMenuClass} id="dropdown-menu-custom">
            {children}
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <div className={dropdownContainer}>
        <ToggleDropdown
          isClickStyle={isClickStyle}
          toBack={toBack}
          onClick={() => setShowModalMenu(true)}
          onBackClick={handleBackClick}
          currentRegulator={currentRegulator}>
          {DropdownDescription}
        </ToggleDropdown>

        <MenuModal
          showModalMenu={showModalMenu}
          handleClose={handleClose}
          description={currentRegulator.description}
          playerDetails={playerDetails}>
          {children}
        </MenuModal>
      </div>
    );
  }
);
