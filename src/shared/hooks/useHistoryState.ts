import * as H from 'history';
import { TopTabId } from 'containers/TabTop/config';
import * as React from 'react';
import { useHistory } from 'react-router';
import isEqual from 'lodash/isEqual';

/**
 * This is the shape of the state that can be found in the history.
 *
 * Please always remember that not only all properties could be not available,
 * but the state itself could be missing.
 *
 * ### Usage example
 *
 * ```ts
 * const location = useLocation<AppHistoryLocationState | undefined>();
 * location.state?.openCompetitionKeys?.includes(competition.key)
 * ```
 */
export interface AppHistoryLocationState {
  /**
   * The keys of all **prematch competitions** of all sports opened by the user.
   */
  readonly openCompetitionKeys?: string[];

  /**
   * The keys of all **special competitions** of all sports opened by the user.
   */
  readonly openSpecialCompetitionKeys?: string[];

  /**
   *
   */

  readonly lastVisitedSportKey?: string | null;

  /**
   *
   */

  readonly sportsbookKeys?: string[];

  /**
   * This property is used to save the selection of Cluste and MetaMarket in the MyLive section
   * key: "1--1-1290--30273-17773-93"
   * sportKey--competitionKey--regulatorKey--clusterKey
   */
  readonly myLivesClusterAndMetaMarketKeys?: string[];

  /**
   *
   */

  readonly lastVisitedLiveNowSportKey?: string | null;

  /**
   *
   */
  readonly calendarOpenTimeSlotIds?: number[];

  /**
   *
   */
  readonly showCustomOpenTimeSlots?: boolean;

  /**
   *
   */
  readonly calendarLastPathname?: string;

  /**
   *
   */
  readonly streamingOnly?: boolean;

  /**
   * It maps sports to the url of the last regulator visited of that sport if any.
   * It has to be used the url because retrieving the regulator is an async operations
   * and therefore too expensive
   */
  readonly lastVisitedRegulators?: { [sportKey: string]: string };

  /**
   * Stores the selected `TopTabId` of the current page.
   */
  readonly selectedTopTabId?: TopTabId;

  /**
   * toggle of the competitions and regulators of the current sport
   * that have `competition.isTopCompetition` set to true`
   */
  readonly topCompetitionsOnly?: boolean;
}

/**
 * TODO useHistoryState può triggerare il rendering tante volte se i dati da recuperare dallo state sono tanti.
 *       Gestire multi get/set (Proposta: sostituire historyStateKey con Record<key, initialValue>)
 */

type NonUndefined<T> = T extends undefined ? never : T;
export type HistoryStateResult<T> = [T, React.Dispatch<React.SetStateAction<T>>];

/*function usePartialHistoryState<
  Keys extends keyof AppHistoryLocationState,
  O = { [K in Keys]: AppHistoryLocationState[K] }
>(initialValues: O): [O, (o: O | ((o: O) => O)) => void] {
  return null as any;
}

const [{ competitionKeys, isLive }, setHistoryState] = usePartialHistoryState({
  competitionKeys: ['a'],
  isLive: false
});

console.log(competitionKeys);

setHistoryState(prev => ({
  ...prev,
  competitionKeys: ['a', 'b']
}));*/

export default function useHistoryState<
  S = AppHistoryLocationState,
  K extends keyof S = never,
  I extends S[K] = S[K]
>(
  historyStateKey: K,
  initialValue: I
): HistoryStateResult<I extends undefined ? S[K] : NonUndefined<S[K]>> {
  const history: H.History<S> = useHistory();
  const historyRef = React.useRef(history);
  historyRef.current = history;

  // Leggiamo il dato corrente se disponibile
  const actualValue = history.location.state?.[historyStateKey];

  const value = actualValue === undefined ? (initialValue as any) : actualValue;

  const setValue: React.Dispatch<React.SetStateAction<S[K]>> = React.useCallback(
    (value: React.SetStateAction<S[K]>) => {
      const prevValue = (historyRef.current.location.state as any)?.[historyStateKey];

      const nextValue =
        typeof value === 'function'
          ? // Lazy value calculation function
            (value as any)(prevValue === undefined ? initialValue : prevValue)
          : // Direct next value passing
            value;

      if (!isEqual(prevValue, nextValue)) {
        historyRef.current.replace({
          ...historyRef.current.location,
          state: {
            ...historyRef.current.location.state,
            [historyStateKey]: nextValue
          }
        });
      }
    },
    [historyStateKey, initialValue]
  );

  React.useLayoutEffect(() => {
    if (initialValue !== undefined) {
      setValue((prevValue) => {
        if (actualValue === undefined) {
          // Initial state if it isn't set
          return initialValue;
        } else {
          return prevValue;
        }
      });
    }
  });

  React.useDebugValue(value);

  return [value, setValue as any];
}
