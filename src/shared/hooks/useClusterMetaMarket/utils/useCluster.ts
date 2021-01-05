import * as React from 'react';

import { ClusterMenu } from 'commons/models/ClusterMenu';
import { Nullable } from 'commons/types';
import { useLocation } from 'react-router';
import { AppHistoryLocationState } from 'shared/hooks/useHistoryState';

export const useCluster = (clusterMenu: ClusterMenu | undefined) => {
  const location = useLocation<AppHistoryLocationState | undefined>();
  const params = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const clusterId = React.useMemo(() => params.get('cluster'), [params]);

  const [selectedClusterId, setSelectedClusterId] = React.useState<Nullable<number | undefined>>(
    clusterId ? Number(clusterId) : null
  );
  const clusters = clusterMenu?.clusters;
  const selectedCluster = clusterMenu?.findCluster(selectedClusterId);

  return {
    clusters,
    selectedCluster,
    setSelectedClusterId
  };
};
