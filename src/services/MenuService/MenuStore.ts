import { Menu } from 'commons/models/Menu';
import { BehaviorSubject } from 'rxjs';

export class MenuStore {
  private static instance: MenuStore;
  /**
   * `window.scrollY`
   */
  readonly menu$ = new BehaviorSubject<Array<Menu>>(new Array<Menu>());

  /**
   * Menu store from
   */

  static getInstance(): MenuStore {
    if (!MenuStore.instance) {
      MenuStore.instance = new MenuStore();
    }
    return MenuStore.instance;
  }
}

export const menuStore = MenuStore.getInstance();
