import Config from 'shared/configuration';
import { replaceAll } from 'shared/utils/replaceAll';
import { Menu } from 'commons/models/Menu';

/**
 * @example /maranata/{menu-label}
 */
export function getMenuItemsbookPathname(menu: Menu) {
  return replaceAll(`${Config.BROWSER_ROUTER_PATH_MAP.MENUBOOK_ITEM}`, [
    [':item', menu.getPathname() || '']
  ]);
}
