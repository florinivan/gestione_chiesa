import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { useCurrentBreakpointName } from 'react-socks';
import { ShowcaseType, Sport } from 'commons/models/Sport';
import { BackgroundColorsVariant } from 'commons/types';
import { Flag } from 'shared/atomic-ui/Flag/Flag';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { Text } from 'shared/atomic-ui/Text/Text';
import styles from 'shared/components/SearchHeader/searchHeader.module.scss';

export interface SearchHeaderProps {
  competitionId: number;
  backgroundColor: BackgroundColorsVariant;
  sport: Sport;
  showcase: ShowcaseType;
  iconUrl?: string;
  description?: string;
  isToggle: boolean;
  toggleButton: (competitionId: number) => void;
  onClose?: () => void;
  hideCloseHeader?: boolean;
  showSportIcon?: boolean;
}

export const SearchHeader: React.FC<SearchHeaderProps> = function SearchHeader(props) {
  const breakpoint = useCurrentBreakpointName();
  const isDesktop = breakpoint.includes('desktop');
  const descriptionClasses = classNames(styles.competitionLabel, styles.ellipsis);

  const classesRowDesktop = classNames(
    props.backgroundColor,
    styles.headerContainer,
    styles.accordion
  );
  const classesIconContainer = classNames(
    'iconContainer m-auto',
    !isDesktop && styles.disable,
    styles.closeIcon
  );

  const handleClose = React.useCallback(
    (domEvent: MouseEvent) => {
      domEvent.stopPropagation();

      props.onClose?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onClose]
  );

  const toggleResult = React.useCallback(
    (domEvent: MouseEvent) => {
      domEvent.stopPropagation();

      props.toggleButton?.(props.competitionId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.competitionId, props.toggleButton]
  );

  return (
    <>
      <div className={classesRowDesktop} onClick={toggleResult}>
        <div className={styles.labelSearchHeader}>
          {props.showSportIcon && (
            <Flag src={props.sport.iconUrl} className={styles.sportIconCssDesktop} />
          )}
          <Flag src={props.iconUrl} className={styles.flagCssDesktop}></Flag>
          <Text as="p" size="text-12" className={descriptionClasses}>
            {props.description}
          </Text>
        </div>
        <div className={styles.dropdownSearchHeader}>
          <div className={styles.buttons}>
            <div>
              <div
                className={classNames(
                  'conContainer',
                  'm-auto',
                  styles.arrowIcon,
                  !isDesktop && styles.mobileArrow
                )}
                onClick={toggleResult}>
                <NewIcon
                  className="d-flex"
                  size="icon-size-24"
                  name={props.isToggle ? 'Arrow-Up' : 'Arrow-Down'}
                  color="white"
                />
              </div>
            </div>
            <div className={classesIconContainer} onClick={handleClose}>
              <NewIcon className="d-flex" size="icon-size-18" name="Close" color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
