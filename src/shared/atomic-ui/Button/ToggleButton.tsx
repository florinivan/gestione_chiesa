import React from 'react';

import {
  ToggleButton as BToggleButton,
  ToggleButtonProps as BToggleButtonProps,
  ButtonProps
} from 'react-bootstrap';
import { ButtonVariantType } from 'shared/atomic-ui/Button/ButtonVariantType';

export type ToggleButtonProps = Omit<
  JSX.IntrinsicElements['button'] & ButtonProps & BToggleButtonProps,
  'variant'
> & {
  variant?: ButtonVariantType;
};

export const ToggleButton = (BToggleButton as unknown) as React.FC<ToggleButtonProps>;
