/*import React from 'react';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';
import { Nullable } from 'commons/types';

interface TabTopPrematchProps {
  isHome?: boolean;
  topPrematch: Nullable<TopPrematch>;
}

export function TabTopPrematch({ isHome, topPrematch }: TabTopPrematchProps) {
  const shapePrematch = useBehaviorSubject(shapesStore.shapePrematch$);
  const {
    getGroupedRegulators,
    getMetaMarket,
    getTopCompetitions,
    getGroupedSport
  } = useTopPrematch(topPrematch);
  const { competitionMapTop, competitionMapNoTop, hasCompetition } = getTopCompetitions();

  return topPrematch && hasCompetition ? (
    <>
      <SportContainer
        isHome={isHome}
        top={topPrematch}
        shape={shapePrematch}
        groupedSport={getGroupedSport(competitionMapTop, topPrematch.sports)}
        competitionMap={competitionMapTop}
        getGroupedRegulators={getGroupedRegulators}
        getMetaMarket={getMetaMarket}
      />

      <SportContainer
        isHome={isHome}
        top={topPrematch}
        shape={shapePrematch}
        groupedSport={getGroupedSport(competitionMapNoTop, topPrematch.sports)}
        competitionMap={competitionMapNoTop}
        getGroupedRegulators={getGroupedRegulators}
        getMetaMarket={getMetaMarket}
      />
    </>
  ) : null;
}*/
