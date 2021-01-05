import React, { HTMLAttributes, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Action } from 'history';
import { Regulator } from 'commons/models/Regulator';
import { AppHistoryLocationState } from 'shared/hooks/useHistoryState';
import { shapesStore } from 'services/ShapesService/ShapesStore';
import { getRegulatorPathname } from 'shared/utils/getBrowserPathname';
import { Livescore } from 'shared/components/Livescore/Livescore';
import { ItemLive } from 'shared/components/DropdownElement/ItemLive';
import styles from 'shared/components/DropdownElement/dropdown.module.scss';

interface ItemRowLiveDropdownProps extends HTMLAttributes<HTMLDivElement> {
  regulator: Regulator;
  overrideClickHandler?: () => void;
  dropDownItemRoutingAction?: Exclude<Action, 'POP'>;
}

export const ItemRowLiveDropdown = React.forwardRef<HTMLDivElement, ItemRowLiveDropdownProps>(
  (
    { regulator, onClick, overrideClickHandler, className, dropDownItemRoutingAction = 'PUSH' },
    ref
  ) => {
    const location = useLocation<AppHistoryLocationState | undefined>();

    function getRegulatorLinkTo(regulator: Regulator) {
      const shape = regulator.isLive()
        ? shapesStore.shapeLive$.getValue()
        : shapesStore.shapePrematch$.getValue();
      const sport = shape?.getSportById(regulator.sportId);
      const competition = shape?.getCompetitionById(regulator.sportId, regulator.competitionId);

      return {
        pathname: getRegulatorPathname(sport, competition, regulator),
        state: location.state
      };
    }

    const livescoreStyleClass = classNames(
      regulator.livescore ? ' pl-2' : ' pl-3',
      styles.liveItemContainer,
      'align-self-center d-flex flex-column mr-2 justify-content-around h-100 w-100'
    );

    const handleClick = (domEvent: MouseEvent<HTMLDivElement>) => {
      domEvent.preventDefault();
      onClick?.(domEvent);
    };

    return (
      <div ref={ref} className={className} onClick={handleClick}>
        <div className="h-100 d-flex">
          <Livescore livescore={regulator?.livescore} />
          <div className={livescoreStyleClass}>
            {overrideClickHandler ? (
              <div onClick={overrideClickHandler}>
                <ItemLive regulator={regulator} />
              </div>
            ) : (
              <Link
                replace={dropDownItemRoutingAction === 'REPLACE'}
                to={getRegulatorLinkTo(regulator)}>
                <ItemLive regulator={regulator} />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
);
