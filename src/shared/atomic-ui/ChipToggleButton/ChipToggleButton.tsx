import React from 'react';

import { ToggleButton, ToggleButtonProps } from 'shared/atomic-ui/Button/ToggleButton';
import { Box } from 'shared/atomic-ui/Layout/Box';
import { Column } from 'shared/atomic-ui/Layout/Column';

interface ChipToggleButtonProps {
  labelSelect: string;
  labelSelectValue: string;
}

export const ChipToggleButton: React.FC<ChipToggleButtonProps & ToggleButtonProps> = ({
  labelSelect,
  labelSelectValue,
  className,
  ...props
}) => {
  const classNameChipSelect = className ? `${className} chips btn-noround` : 'chips btn-noround';
  return (
    <ToggleButton value={0} variant="quote" className={classNameChipSelect} {...props}>
      <Box type="row">
        <Column xs="12">
          <div className="wrapper-chips">
            <div className="chips-result">{labelSelect}</div>
            <div className="chips-quote">{labelSelectValue}</div>
          </div>
        </Column>
      </Box>
    </ToggleButton>
  );
};
