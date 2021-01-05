import * as React from 'react';

import { Cluster } from 'commons/models/Cluster';

export const useShowClusterBar = (clusters: Cluster[] | undefined) => {
  return React.useMemo(() => {
    if (!clusters) {
      return false;
    }

    const defaultCluster = clusters.find(cluster => cluster.isDefaultCluster);

    return !!defaultCluster && defaultCluster.metaMarkets.length > 6 && clusters.length > 2;
  }, [clusters]);
};
