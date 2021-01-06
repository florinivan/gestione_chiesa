import React, { ComponentProps } from 'react';
import { FormattedNumber, IntlProvider } from 'react-intl';
import Config from 'shared/configuration';

type FormatMoneyPropsUsed = Pick<
  ComponentProps<typeof FormattedNumber>,
  'value' | 'minimumFractionDigits' | 'maximumFractionDigits'
>;

type AdditionalProps = {
  skipCentsNormalization?: boolean;
  isBefore?: boolean;
};

export type FormattedMoneyProps = FormatMoneyPropsUsed & AdditionalProps;

export const FormattedMoney: React.FC<FormattedMoneyProps> = ({
  value,
  skipCentsNormalization,
  isBefore = false,
  minimumFractionDigits = Config.DEFAULT_NUMBER_FORMAT_DECIMALS,
  maximumFractionDigits = Config.DEFAULT_NUMBER_FORMAT_DECIMALS
}) => {
  const formattedNumber = (
    <FormattedNumber
      value={value}
      style="currency"
      currency="EUR"
      currencyDisplay="symbol"
      minimumFractionDigits={minimumFractionDigits}
      maximumFractionDigits={maximumFractionDigits}
    />
  );

  return isBefore ? <IntlProvider locale="en"> {formattedNumber} </IntlProvider> : formattedNumber;
};
