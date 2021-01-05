import React from 'react';

import classNames from 'classnames';

import styles from 'shared/atomic-ui/SearchBar/searchBar.module.scss';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

interface SearchbarProps {
  fluid?: boolean;
  labelError?: string;
  validate?: boolean;
  enableCloseButton?: boolean;
  showLabelError?: boolean;
  labelErrorPosition?: 'top' | 'bottom';
  onChange?: (value: string) => void;
  externalReset?: boolean;
}

type SearchBarType = SearchbarProps & Omit<JSX.IntrinsicElements['input'], 'onChange'>;

const { tip: tipCSS, fluid: fluidCSS } = styles;

export const SearchBar: React.FC<SearchBarType> = React.memo(
  ({
    fluid,
    labelError,
    enableCloseButton = false,
    showLabelError = true,
    labelErrorPosition = 'bottom',
    value,
    onChange,
    externalReset,
    validate,
    ...props
  }) => {
    const fluidClasses = classNames({
      [`${fluidCSS}`]: fluid
    });

    const [showCloseButton, setShowCloseButton] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState(value ?? '');

    const onTextChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowCloseButton(enableCloseButton && event.target.value !== '');
        onChange?.(event.target.value);
        value === undefined && setCurrentValue(event.target.value);
      },
      [enableCloseButton, onChange, value]
    );

    const onCancelClicked = React.useCallback(() => {
      setCurrentValue('');
      onChange?.('');
      setShowCloseButton(false);
    }, [onChange]);

    React.useEffect(() => {
      if (externalReset) {
        onCancelClicked();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [externalReset]);

    React.useEffect(() => {
      setCurrentValue(value ?? '');
    }, [value]);

    return (
      <React.Fragment>
        <div className={styles.container}>
          <input
            className={`search-input text-12  ${fluidClasses}`}
            onChange={onTextChange}
            value={currentValue}
            {...props}
          />
          {showCloseButton && (
            <span className={`close ${styles.closeBtn}`}>
              <NewIcon color="black" onClick={onCancelClicked} size="icon-size-16" name="Close" />
            </span>
          )}
        </div>
        {showLabelError && labelErrorPosition === 'bottom' && (
          <p className={`${tipCSS} ${styles.errorBottom}`}>{validate && labelError}</p>
        )}
      </React.Fragment>
    );
  }
);
