import * as React from 'react';

import { Competition } from 'commons/models/Competition';
import { useClusterMetaMarket } from 'shared/hooks/useClusterMetaMarket/utils/useClusterMetaMarket';
import { RegulatorDetailLive } from 'commons/models/RegulatorDetailLive';
import useHistoryState from 'shared/hooks/useHistoryState';
import { Sport } from 'commons/models/Sport';
import { Nullable } from 'commons/types';

export const useClusterMetaMarketSelectionMyLive = (
  sport: Sport,
  competition: Competition,
  regulatorDetailLive: Nullable<RegulatorDetailLive>
) => {
  const {
    clusters,
    selectedCluster,
    metaMarkets,
    selectedMetaMarket,
    onClusterSelected,
    onMetaMarketSelected,
    setSelectedClusterId
  } = useClusterMetaMarket(regulatorDetailLive?.clustersMenu);

  // sportKey--competitionKey--regulatorKey--clusterKey--metamarketKey

  const [myLivesClusterAndMetaMarketKeys, setMyLivesClusterAndMetaMarketKeys] = useHistoryState(
    'myLivesClusterAndMetaMarketKeys',
    []
  );

  React.useEffect(() => {
    const foundedKey = myLivesClusterAndMetaMarketKeys.find(key =>
      key.startsWith(`${sport.key}--${competition.key}--${regulatorDetailLive?.regulator.key}--`)
    );
    if (foundedKey) {
      const splittedKey = foundedKey.split('--');
      if (splittedKey && splittedKey.length == 4) {
        const keyClusterId = splittedKey[3] ? Number(splittedKey[3]) : undefined;
        setSelectedClusterId(keyClusterId);
      }
    } else {
      setSelectedClusterId(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regulatorDetailLive?.regulator.key]);

  React.useEffect(() => {
    // update history
    if (selectedCluster?.clusterId && regulatorDetailLive?.regulator && sport && competition) {
      const newKey = `${sport.key}--${competition.key}--${regulatorDetailLive?.regulator.key}--${selectedCluster?.clusterId}`;
      const myLivesClusterAndMetaMarketUpdate: string[] = myLivesClusterAndMetaMarketKeys.filter(
        key =>
          !key.startsWith(
            `${sport.key}--${competition.key}--${regulatorDetailLive?.regulator.key}--`
          )
      );
      myLivesClusterAndMetaMarketUpdate.push(newKey);
      setMyLivesClusterAndMetaMarketKeys(myLivesClusterAndMetaMarketUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCluster]);

  return {
    clusters,
    selectedCluster,
    metaMarkets,
    selectedMetaMarket,
    onClusterSelected,
    onMetaMarketSelected
  };
};
