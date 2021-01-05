import * as React from 'react';

import { Cluster } from 'commons/models/Cluster';
import { Nullable } from 'commons/types';
import { useLocation } from 'react-router';
import { AppHistoryLocationState } from 'shared/hooks/useHistoryState';

export const useMetaMarket = (selectedCluster: Cluster | undefined) => {
  const location = useLocation<AppHistoryLocationState | undefined>();
  const params = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const metaMarketId = React.useMemo(() => params.get('cde'), [params]);

  const [selectedMetaMarketId, setSelectedMetaMarketId] = React.useState<
    Nullable<number | undefined>
  >(metaMarketId ? Number(metaMarketId) : null);

  const metaMarkets = selectedCluster?.metaMarkets;
  const selectedMetaMarket = selectedCluster?.findMetaMarket(selectedMetaMarketId);

  return {
    metaMarkets,
    selectedMetaMarket,
    setSelectedMetaMarketId
  };
};
