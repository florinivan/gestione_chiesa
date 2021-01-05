import React from 'react';
import { useCurrentWidth } from 'react-socks';
import { useIntl } from 'react-intl';

import { getBreakpoint } from 'shared/utils/breakpoint';

import styles from 'shared/atomic-ui/SearchBarMatch/searchBarMatch.module.scss';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

interface SearchbarMatchProps {
  labelError?: string;
  validate?: boolean;
  showCloseButton?: boolean;
  onCancelClicked?: () => void;
}

type SearchBarType = SearchbarMatchProps & JSX.IntrinsicElements['input'];

export const SearchBarMatch: React.FC<SearchBarType> = React.memo(
  ({ labelError, validate, showCloseButton = false, onCancelClicked, ...props }) => {
    const intl = useIntl();
    const width = useCurrentWidth();

    return (
      <div className={styles.searchBarMatch_container}>
        <div className={styles.searchBarMatch_container__searchBar}>
          {width >= getBreakpoint('tablet') && (
            <div className={styles.searchBarMatch_container__searchBar__title}>
              {width > getBreakpoint('desktopLarge') && (
                <h4>{intl.formatMessage({ id: 'fr.containers.Market.chooseMarket' })}</h4>
              )}
            </div>
          )}
          <div
            className={`d-flex flex-grow-1 justify-content-end ${styles.searchBarMatch_container__searchBar__input}`}>
            <input className={`search-input text-12`} {...props} />
            {showCloseButton && (
              <span className={`close ${styles.closeBtn}`}>
                <NewIcon color="black" onClick={onCancelClicked} size="icon-size-16" name="Close" />
              </span>
            )}
          </div>
        </div>
        {validate && labelError && (
          <div>
            <p className={styles.tip}>{labelError}</p>
          </div>
        )}
      </div>
    );
  }
);
