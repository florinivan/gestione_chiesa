import React from 'react';
import { SearchHeaderProps } from 'shared/components/SearchHeader/SearchHeader';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router';
import { BROWSER_ROUTER_PATH_MAP } from 'shared/configuration';

export const useSearchHeader = ({ toggleButton, competitionId, isToggle }: SearchHeaderProps) => {
  const isSpecialPage = useRouteMatch(BROWSER_ROUTER_PATH_MAP.SPECIAL_PREMATCH);
  const [openModal, setOpenModal] = React.useState(false);

  const intl = useIntl();

  return {
    toggleButton,
    competitionId,
    isToggle,
    openModal,
    setOpenModal,
    intl,
    isSpecialPage
  };
};
