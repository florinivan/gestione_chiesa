import { Menu } from 'commons/models/Menu';
import { getMenuItemsbookPathname } from 'shared/utils/getBrowserPathname';

export interface GetMenuPage {
  (menu: Menu): string;
}

function getSportLinkTo(menu: Menu): string {
  return getMenuItemsbookPathname(menu);
}

/**
 */
export function useComputeMenuGetLink(): GetMenuPage {
  return getSportLinkTo;
}
