import * as React from 'react';
import { useRouteMatch } from 'react-router';

import { HorizontalMenu } from 'containers/HMenu/HorizontalMenu';
import Config from 'shared/configuration';
import { Menu } from 'commons/models/Menu';
import { menuService } from 'services/MenuService/MenuService';

interface ScrollHorizontalMenuProps {
  getLinkTo(item: Menu): string;
  rightButton?: React.ReactNode;
}

export function ScrollHorizontalMenu({ getLinkTo, rightButton }: ScrollHorizontalMenuProps) {
  const shapeMenus = menuService.getMenus();

  const restRouteMatch = useRouteMatch<{ item: string }>({
    // path: Config.BROWSER_ROUTER_SPORTS_PATH_PREMATCH,
    path: [...Config.BROWSER_ROUTER_PATH_MENUBOOK, Config.BROWSER_ROUTER_PATH_MAP.MENUBOOK_ITEM],
    exact: true
  });

  const current: Menu | undefined = menuService?.getMenuByPathname(restRouteMatch?.params.item);

  return (
    <HorizontalMenu
      rightButton={rightButton}
      current={current}
      listmenu={shapeMenus}
      getLinkTo={getLinkTo}
    />
  );
}
