import React, { HTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';
import styles from 'shared/atomic-ui/LoadingOverlay/loadingOverlay.module.scss';

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  classes?: Record<'spinner' | 'hiddenOverlay' | 'visibleOveray', string>;
  isLoading: boolean;
}

/**
 * An overay that is applied to the closest stacking context.
 */
export const LoadingOverlay = ({
  classes,
  isLoading,
  className,
  ...otherProps
}: LoadingOverlayProps) => {
  return (
    <div
      className={classNames(
        styles.loadingOverlay,
        isLoading && styles.visibleOverlay,
        isLoading ? classes?.visibleOveray : classes?.hiddenOverlay,
        className
      )}
      {...otherProps}>
      <div className={classNames('spinner-border', classes?.spinner)} role="status">
        <span className="sr-only">
          <FormattedMessage id="fr.shared.components.LoadingOverlay.label" />
        </span>
      </div>
    </div>
  );
};
