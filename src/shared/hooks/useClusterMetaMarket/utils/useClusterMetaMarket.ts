import { ClusterMenu } from 'commons/models/ClusterMenu';
import { Cluster } from 'commons/models/Cluster';
import { MetaMarket } from 'commons/models/MetaMarket';
import { useCluster } from 'shared/hooks/useClusterMetaMarket/utils/useCluster';
import { useMetaMarket } from 'shared/hooks/useClusterMetaMarket/utils/useMetaMarket';

export const useClusterMetaMarket = (clusterMenu: ClusterMenu | undefined) => {
  const { clusters, selectedCluster, setSelectedClusterId } = useCluster(clusterMenu);
  const { metaMarkets, selectedMetaMarket, setSelectedMetaMarketId } = useMetaMarket(
    selectedCluster
  );

  const onClusterSelected = (cluster: Cluster) => {
    setSelectedClusterId(cluster.clusterId);
    setSelectedMetaMarketId(cluster.getFirstMetaMarket()?.metaMarketId);
  };

  const onMetaMarketSelected = (cluster: Cluster, metaMarket: MetaMarket) => {
    setSelectedClusterId(cluster.clusterId);
    setSelectedMetaMarketId(metaMarket.metaMarketId);
  };

  return {
    clusters,
    selectedCluster,
    metaMarkets,
    selectedMetaMarket,
    onClusterSelected,
    onMetaMarketSelected,
    setSelectedClusterId,
    setSelectedMetaMarketId
  };
};
