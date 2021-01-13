import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { TopTabId } from 'containers/TabTop/config';
import { EmptyFallback } from 'shared/components/EmptyFallback/EmptyFallback';
import Config from 'shared/configuration';
import { AppHistoryLocationState } from 'shared/hooks/useHistoryState';
import styles from 'shared/components/NoSelections/noSelections.module.scss';

export const NoSelections = React.memo(function NoSelections() {
  const { location } = useHistory<AppHistoryLocationState | undefined>();

  const linkTo = {
    pathname: Config.BROWSER_ROUTER_PATH_MAP.SHOWCASE_HOME,
    state: { ...location.state, selectedTopTabId: TopTabId.TopLive }
  };

  return (
    <EmptyFallback
      linkTo={linkTo}
      linkContent={<FormattedMessage id="fr.shared.components.NoSelections.CTA" />}
      title={<FormattedMessage id="fr.shared.components.NoSelections.title" />}
      description={<FormattedMessage id="fr.shared.components.NoSelections.description" />}
      classes={styles}
    />
  );
});
