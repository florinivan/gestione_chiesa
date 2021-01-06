import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { WidgetsOrder } from 'commons/models/WidgetsOrder';
import { map, tap } from 'rxjs/operators';
import { rootAPI } from 'shared/api/Api';

export class WidgetsConfigService {
  private static instance: WidgetsConfigService;
  readonly widgetsOrder$ = new BehaviorSubject<WidgetsOrder>(WidgetsOrder.empty());

  static getInstance() {
    if (!WidgetsConfigService.instance) {
      WidgetsConfigService.instance = new WidgetsConfigService();
    }
    return WidgetsConfigService.instance;
  }

  orderWidgets(route: string) {
    return this.widgetsOrder$.pipe(
      map((value) => {
        const routeWidgetsOrder = value.getRouteWidgetOrder(route);

        if (!routeWidgetsOrder) {
          return [];
        }

        return Object.values(routeWidgetsOrder).sort((a, b) => {
          if (a === undefined) {
            throw new Error('One of the params must be provided.');
          }
          if (b === undefined) {
            throw new Error('One of the params must be provided.');
          }
          return a.position - b.position;
        });
      })
    );
  }

  fetchAll() {
    return rootAPI.getShapeWidgetsOrder().pipe(tap((data) => this.widgetsOrder$.next(data)));
  }
}
const widgetsConfigService = WidgetsConfigService.getInstance();
export { widgetsConfigService };
