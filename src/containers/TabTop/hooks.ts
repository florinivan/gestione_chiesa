import { useLocation } from 'react-router-dom';
import useHistoryState, { HistoryStateResult } from 'shared/hooks/useHistoryState';
import { TopTabId } from 'containers/TabTop/config';

/**
 * Returns the selected `TopTabId` of the current page.
 * @param intialTab optional intial value default s to `TopTabId.TopLive`.
 *
 * Note that `intialTab` will be used only if there's not already a value in
 * `window.history.state`.
 */
export function useSelectedTopTabId(
  intialTab: TopTabId = TopTabId.TopLive
): HistoryStateResult<TopTabId> {
  /*
   * We add `useLocation` to trigger a re-render whenever `window.history.state` changes,
   * Currently `useHistoryState` does not trigger an update.
   */
  useLocation();

  return useHistoryState('selectedTopTabId', intialTab);
}
