import React from 'react';
import { Subscription } from 'rxjs';
import { ticketSaleService } from 'services/TicketSaleService/TicketSaleService';
import { Selection } from 'commons/models/Selection';

export function useSelection() {
  /**
   * Ref to previous selections
   */
  const selectionsRef = React.useRef<Record<string, Selection>>({});

  /**
   * Reference to the rxjs subscription
   */
  const subscriptionRef = React.useRef<Subscription>();

  /**
   * Get previous selection
   */
  const getPrevSelection = React.useCallback((selection: Selection) => {
    const prevSelections = selectionsRef.current;
    return prevSelections[selection.getSelectionKey()];
  }, []);

  /**
   * Click handler for "Selection" buttons
   * @return {undefined}
   */
  const handleSelectionClick = React.useCallback(function handleSelectionClick(
    selection: Selection,
    domEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    // Prevent default behaviour
    domEvent.preventDefault();

    const subscription: Subscription | null = ticketSaleService.handleSelectionChangeRequest(
      selection
    );

    if (subscription) {
      // We need to clean up the previous subscription if it is in progress.
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      subscriptionRef.current = subscription;
    }
  },
  []);

  /**
   * Get the price direction comparing prev and next selection prices
   * @return {number} 0 = same price | 1 = price increased | -1 = price decreased
   */
  const getPriceDirection = React.useCallback(
    (selection: Selection) => {
      let result = 0; // Nothing changes
      const prevSelection = getPrevSelection(selection); // Get the previous value

      if (!prevSelection) {
        result = 0; // If there's no prev value, so nothing changes
      } else {
        // Is price decreased?
        if (selection.selectionPrice < prevSelection.selectionPrice) {
          result = -1;
        }
        // Is price increased
        if (selection.selectionPrice > prevSelection.selectionPrice) {
          result = 1;
        }
      }
      selectionsRef.current[selection.getSelectionKey()] = selection; // Save the selection in order to compare it next time
      return result;
    },
    [getPrevSelection]
  );

  /**
   * Unmount
   */
  React.useEffect(() => {
    // Cancel request if it is in progress.
    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, []);

  return {
    handleSelectionClick,
    getPriceDirection
  };
}
