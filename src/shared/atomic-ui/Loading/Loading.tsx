import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from 'shared/atomic-ui/Loading/loading.module.scss';

import { IconLoading } from 'shared/atomic-ui/Loading/IconLoading';

const { ['container']: container, ['items']: item, ['icon']: icon } = styles;

interface LoadingProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export const Loading: React.FC<LoadingProps> = React.memo(({ isLoading, children }) => {
  return !isLoading ? (
    <>{children}</>
  ) : (
    <div className={container}>
      <div className={item}>
        <IconLoading width="40px" heigth="40px" className={icon} />
        <p>
          <FormattedMessage id="fr.shared.components.Loading.label" />
        </p>
      </div>
    </div>
  );
});
