import { ScrollHorizontalMenu } from 'containers/HMenu/ScrollHorizontalMenu';
import React from 'react';
import { useComputeMenuGetLink } from 'shared/hooks/menuPageLinks';

export const Menubook = React.memo(function Menubook() {
  const getMenuLinkTo = useComputeMenuGetLink();

  return (
    <>
      <ScrollHorizontalMenu getLinkTo={getMenuLinkTo} />
    </>
  );
});
