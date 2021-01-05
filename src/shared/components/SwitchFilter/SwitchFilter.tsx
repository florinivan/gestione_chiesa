import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Text } from 'shared/atomic-ui/Text/Text';
import { SwitchButton } from 'shared/atomic-ui/SwitchButton/SwitchButton';

interface SwitchFilterProps {
  nameId: string;
  icon?: React.ReactNode;
  iconUrl?: string;
  regulatorsCount?: number;
  isChecked: boolean;
  setIsChecked: () => void;
  className?: string;
}

export const SwitchFilter: React.FC<SwitchFilterProps> = ({
  nameId,
  icon,
  iconUrl,
  regulatorsCount,
  isChecked,
  setIsChecked,
  className
}) => {
  return (
    <div className={classNames('d-flex', className)}>
      <Text as="p" size="text-12" icon={icon} iconUrl={iconUrl} iconPosition="left">
        <FormattedMessage id={nameId} />
        {typeof regulatorsCount === 'number' ? ` (${regulatorsCount})` : null}
      </Text>
      <SwitchButton isChecked={isChecked} setIsChecked={setIsChecked} />
    </div>
  );
};
