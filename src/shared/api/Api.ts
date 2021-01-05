import { HttpClient } from 'commons/http/HttpClient';

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
  /*
  getShapePrematch(): Observable<ShapePrematch> {
    return httpClient
      .get<ShapePrematchRaw>(`${Config.API_BASE_PREMATCH}/alberaturaPrematch`)
      .pipe(map(({ response }) => new ShapePrematch(response)));
  }*/
}

const rootAPI = API.getInstance();
export { rootAPI };
