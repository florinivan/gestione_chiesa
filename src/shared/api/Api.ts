import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpClient } from 'commons/http/HttpClient';
import { WidgetsOrderRaw, WidgetsOrder } from 'commons/models/WidgetsOrder';
import Config from 'shared/configuration';
import { PresentMember, PresentMemberRaw } from 'commons/models/PresentMember';

export const httpClient = new HttpClient({
  baseUrl: process.env.REACT_APP_ENDPOINT
});

export const httpClientCustom = new HttpClient({ baseUrl: '' });

export class API {
  private static instance: API;

  static getInstance() {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  /**
   *API to retrive
   */
  getPresentMember(): Observable<PresentMember[]> {
    return (
      httpClient
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .get<any>(`${Config.API_BASE}/presenza_chiesa`)
        .pipe(
          map(({ response }) => response.map((raw: PresentMemberRaw) => new PresentMember(raw)))
        )
    );
  }

  /**
   *
   */
  getShapeWidgetsOrder(): Observable<WidgetsOrder> {
    return httpClient.get<WidgetsOrderRaw>(`${Config.API_BASE}/routes`).pipe(
      map(({ response }) => {
        const shapeWidgetsOrder = new WidgetsOrder(response);
        return shapeWidgetsOrder;
      })
    );
  }
}
const rootAPI = API.getInstance();
export { rootAPI };
