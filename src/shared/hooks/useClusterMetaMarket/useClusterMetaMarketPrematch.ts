import * as React from 'react';

import { ClusterMenu } from 'commons/models/ClusterMenu';
import { useCompetitionTimeFilter } from 'shared/utils/historyManagement/competitionsTimeFilter';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';
import { competitionsService } from 'services/CompetitionsService';
import { Competition } from 'commons/models/Competition';
import { useClusterMetaMarket } from 'shared/hooks/useClusterMetaMarket/utils/useClusterMetaMarket';

export const useClusterMetaMarketSelectionPrematch = (
  clusterMenu: ClusterMenu | undefined,
  competition?: Competition
) => {
  const {
    clusters,
    selectedCluster,
    metaMarkets,
    selectedMetaMarket,
    onClusterSelected,
    onMetaMarketSelected,
    setSelectedClusterId,
    setSelectedMetaMarketId
  } = useClusterMetaMarket(clusterMenu);

  const selectedMetaMarkets = useBehaviorSubject(competitionsService.selectedMetaMarkets$);
  const { getCompetitionTimeFilterFrom } = useCompetitionTimeFilter();
  const time = getCompetitionTimeFilterFrom(competition);
  const isCompetitionAndTime = competition && (time === 0 || time);

  React.useEffect(() => {
    if (isCompetitionAndTime) {
      const selectedClusterMetaMarkets = selectedMetaMarkets[`${time}_${competition?.key}`];
      if (selectedClusterMetaMarkets) {
        setSelectedClusterId(selectedClusterMetaMarkets?.clusterId);
        setSelectedMetaMarketId(selectedClusterMetaMarkets?.metaMarketId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competition, time, isCompetitionAndTime]);

  React.useEffect(() => {
    if (isCompetitionAndTime && competition) {
      competitionsService.setSelectedMetaMarkets(
        time,
        competition,
        selectedCluster?.clusterId,
        selectedMetaMarket?.metaMarketId
      );
    }
  }, [competition, selectedCluster, selectedMetaMarket, time, isCompetitionAndTime]);

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
