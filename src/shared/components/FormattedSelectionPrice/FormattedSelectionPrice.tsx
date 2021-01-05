import React from 'react';
import { formatNumberWithoutRounding } from 'commons/utils';

export interface FormattedSelectionPriceProps {
  value: number;
  skipCentsNormalization?: boolean;
}

export const FormattedSelectionPrice = React.memo(function FormattedSelectionPrice({
  value,
  skipCentsNormalization
}: FormattedSelectionPriceProps) {
  const normalizedValue = skipCentsNormalization ? value : value / 100;

  const formattedValue = formatNumberWithoutRounding(normalizedValue, 2);

  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
  return <>{formattedValue}</>;
});
