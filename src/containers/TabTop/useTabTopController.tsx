/*import React from 'react';
import { Nullable } from 'commons/types';
import { TopLive } from 'commons/models/TopLive';
import { TopPrematch } from 'commons/models/TopPrematch';
import { LastMinute } from 'commons/models/LastMinute';
import { FormattedMessage } from 'react-intl';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';
import { useGetLastMinute, useGetTopLive, useGetTopPrematch } from 'services/TopBetsService/hooks';
import { shapesStore } from 'services/ShapesService/ShapesStore';
import { TopTabId } from 'containers/TabTop/config';

type TopTab = { id: TopTabId; label: JSX.Element };

const TOP_TABS: ReadonlyArray<TopTab> = [
  {
    id: TopTabId.TopLive,
    label: <FormattedMessage id="fr.containers.TabTop.topLive" />
  },
  {
    id: TopTabId.TopPrematch,
    label: <FormattedMessage id="fr.containers.TabTop.topPrematch" />
  },
  {
    id: TopTabId.LastMinute,
    label: <FormattedMessage id="fr.containers.TabTop.lastMinute" />
  }
] as const;

function computeVisibleTopTabs(
  topLive: Nullable<TopLive>,
  topPrematch: Nullable<TopPrematch>,
  lastMinute: Nullable<LastMinute>
): ReadonlyArray<TopTab> {
  return TOP_TABS.filter(tab => {
    switch (tab.id) {
      case TopTabId.TopLive:
        return Boolean(topLive?.sports?.length);
      case TopTabId.TopPrematch:
        return Boolean(topPrematch?.sports?.length);
      case TopTabId.LastMinute:
        return Boolean(lastMinute?.regulators?.length);
    }
  });
}

export function useTabTopController(selectedTabId: TopTabId, sportKey: string) {
  const topPrematch = useGetTopPrematch(sportKey);
  const topLive = useGetTopLive(sportKey);
  const lastMinute = useGetLastMinute(sportKey);
  const shapePrematch = useBehaviorSubject(shapesStore.shapePrematch$);

  const tabs = computeVisibleTopTabs(topLive, topPrematch, lastMinute);

  const defaultTabId = tabs[0]?.id;
  const isSelectedTabIdValid = tabs.some(tab => tab.id === selectedTabId);

  const tabId = isSelectedTabIdValid ? selectedTabId : defaultTabId;

  return { tabId, tabs, topPrematch, topLive, lastMinute, shapePrematch };
}*/
