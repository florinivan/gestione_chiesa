import React from 'react';
import { Selection } from 'commons/models/Selection';
import { useExpiration } from 'shared/hooks/useExpiration';

export const useSelectionButton = (selection: Selection) => {
  const selectionKey = selection.getSelectionKey();
  const selectionPrice = selection.selectionPrice;
  const selectionNotPlayable = selection.isDisabled();

  const prevSelectionKeyRef = React.useRef<string>(''); //TODO use the "usePrevious"
  const prevSelectionPriceRef = React.useRef<number>(0); //TODO use the "usePrevious"

  const [showDiffUntil, setShowDiffUntil] = React.useState<number | null>(null);
  const [trendSelectionPrice, setTrendSelectionPrice] = React.useState<string>('stable');
  const [diffId, setDiffId] = React.useState<boolean>(false);

  React.useEffect(() => {
    prevSelectionPriceRef.current = selectionPrice; //TODO use the "usePrevious"
    prevSelectionKeyRef.current = selectionKey; //TODO use the "usePrevious"
  });

  React.useEffect(() => {
    if (prevSelectionPriceRef.current !== selectionPrice) {
      //TODO: ADD in 5000 mostraAndamentoQuotaLivePerMillisec
      setShowDiffUntil(Date.now() + 5000);
      setTrendSelectionPrice(
        selectionPrice > prevSelectionPriceRef.current ? 'increasing' : 'decreasing'
      );
      prevSelectionPriceRef.current = selectionPrice;
    } else {
      setTrendSelectionPrice('stable');
    }

    if (prevSelectionKeyRef.current.includes(selectionKey)) {
      setDiffId(false);
    } else {
      setDiffId(true);
      prevSelectionKeyRef.current = selectionKey;
    }
  }, [selectionPrice, selectionKey]);
  //TODO: ADD in useEffect mostraAndamentoQuotaLivePerMillisec

  const showDiff = useExpiration(showDiffUntil);

  return { selectionNotPlayable, diffId, showDiff, trendSelectionPrice };
};
