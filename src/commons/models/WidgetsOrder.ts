import { WidgetName } from 'commons/enums';

export interface WidgetsOrderRaw {
  routes: Partial<Record<string, Partial<Record<WidgetName, WidgetOrder>>>>;
}

export interface WidgetOrder {
  readonly id: number;
  readonly name: WidgetName;
  readonly label: string;
  readonly position: number;
}

export class WidgetsOrder {
  public readonly routes: WidgetsOrderRaw['routes'];

  constructor(raw: WidgetsOrderRaw) {
    this.routes = raw?.routes;
  }

  getRouteWidgetOrder(route: string) {
    return this.routes[route];
  }

  static empty() {
    return new WidgetsOrder({ routes: {} });
  }
}
