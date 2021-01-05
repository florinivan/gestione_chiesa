import { Cluster } from 'commons/models/Cluster';
import { MarketsDecorated } from 'commons/types';

export default function getCusterFilter(
  clusters: Cluster[],
  regulatorKey: string,
  markets: MarketsDecorated
): Cluster[] {
  return clusters.filter(cluster => {
    return cluster.metaMarkets.some(metaMarket => {
      return metaMarket.marketIds.some(marketId => {
        const marketkey = regulatorKey + '-' + marketId;
        return markets[marketkey] ? true : false;
      });
    });
  });
}
