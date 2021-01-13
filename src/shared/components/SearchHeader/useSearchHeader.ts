import React from 'react';
import { SearchHeaderProps } from 'shared/components/SearchHeader/SearchHeader';
import { useIntl } from 'react-intl';

export const useSearchHeader = ({ toggleButton, competitionId, isToggle }: SearchHeaderProps) => {
  const [openModal, setOpenModal] = React.useState(false);

  const intl = useIntl();

  return {
    toggleButton,
    competitionId,
    isToggle,
    openModal,
    setOpenModal,
    intl
  };
};
