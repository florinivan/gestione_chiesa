import { Menu } from 'commons/models/Menu';
import hmenu from 'shared/utils/menu/hMenu.json';

export class MenuService {
  private static instance: MenuService;
  static getInstance(): MenuService {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService();
    }
    return MenuService.instance;
  }
  getMenus() {
    return hmenu.menus.map((item) => new Menu(item));
  }
  getMenuByPathname(pathname: string | null | undefined): Menu | undefined {
    return this.getMenus().find((item) => item.getPathname() === pathname);
  }
}

const menuService = MenuService.getInstance();

export { menuService };
