import boxMessageScssVars from 'containers/Ticket/components/BoxPostSaleMessage/_variables.scss';
import { browserInfoStore } from 'services/BrowserInfoService/BrowserInfoStore';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';
import { useTicketSaleResultStatus } from 'services/TicketPostSaleService/hooks';

const parsedBoxMessageheight = parseInt(boxMessageScssVars.height, 10);

/**
 * Returns the offset of sticky elements, e.g. TicketSidePanel, StickyGridHeader.
 */
export function useComputeAffixTopOffset(): number {
  const { isTicketSaleInAcceptancePhase: isMessageVisible } = useTicketSaleResultStatus();
  const fixedElementsHeightAboveRootBetting = useBehaviorSubject(
    browserInfoStore.fixedHeightAboveRootBetting$
  );

  if (isMessageVisible) {
    return fixedElementsHeightAboveRootBetting + parsedBoxMessageheight;
  }

  return fixedElementsHeightAboveRootBetting;
}
