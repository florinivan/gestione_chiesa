import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Column } from 'shared/atomic-ui/Layout/Column';
import { InputState } from 'shared/components/PreferedPointOfSale/usePreferedPointOfSaleController';

interface InputComponentProps {
  name: string;
  state: InputState;
  onEventHandler: (event: string, name: string, value: string) => void;
  maxLength?: number;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  name,
  state,
  onEventHandler,
  maxLength
}) => {
  const { formatMessage: f } = useIntl();

  return (
    <Column xs="6" md="3" lg="6" className={`mb-3`}>
      <div style={{ height: 11 }}>
        {state.initialValue || state.touched ? (
          <p className={`text-10 font-weight-bold ml-1 ${state.textColor}`}>
            <FormattedMessage id={state.text} />
          </p>
        ) : (
          ''
        )}
      </div>

      <input
        type="text"
        className={`input border rounded p-2 w-100 text-12 ${state.borderColor}`}
        value={state.value}
        onChange={e => onEventHandler('onChange', name, e.target.value)}
        onFocus={e => onEventHandler('onFocus', name, e.target.value)}
        onBlur={e => onEventHandler('onBlur', name, e.target.value)}
        placeholder={!state.touched ? f({ id: state.text }) : ''}
        disabled={state.disabled}
        maxLength={maxLength}
      />
    </Column>
  );
};
