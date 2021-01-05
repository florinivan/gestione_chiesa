import { HttpOptions, HttpRequest, HttpResponse, Interceptors, Methods } from 'commons/http/types';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export class HttpClient {
  ajaxInstance = ajax;
  interceptors: Interceptors = {
    request: [],
    response: []
  };

  constructor(options: HttpOptions) {
    this.interceptors.request.push((request: { url: any }) => ({
      ...request,
      url: `${options.baseUrl}${request.url}`
    }));
  }

  private _interceptResponse<T>(response: HttpResponse<T>): HttpResponse<T> {
    for (const interceptor of this.interceptors.response) {
      response = interceptor(response);
    }
    return response;
  }

  private _interceptRequest<T>(request: Partial<HttpRequest<T>>): Partial<HttpRequest<T>> {
    for (const interceptor of this.interceptors.request) {
      request = interceptor(request);
    }
    return request;
  }

  request<T, Y>(options: Partial<HttpRequest<Y>>): Observable<HttpResponse<T>> {
    // console.log('HTTP request', options.url);
    return this.ajaxInstance(this._interceptRequest<Y>(options)).pipe(
      map((res) => {
        // console.log('HTTP GOT', options.url, res);
        return this._interceptResponse<T>(res as HttpResponse<T>);
      })
    );
  }

  get<T>(url: string, options?: Partial<HttpRequest<null>>): Observable<HttpResponse<T>> {
    return this.request<T, null>({
      url,
      method: Methods.GET,
      ...options
    });
  }

  post<T, Y>(url: string, body: Y, options?: Partial<HttpRequest<Y>>): Observable<HttpResponse<T>> {
    return this.request<T, Y>({
      url,
      body,
      method: Methods.POST,
      ...options
    });
  }

  put<T, Y>(url: string, body: Y, options?: Partial<HttpRequest<Y>>): Observable<HttpResponse<T>> {
    return this.request<T, Y>({
      url,
      body,
      method: Methods.PUT,
      ...options
    });
  }

  patch<T, Y>(
    url: string,
    body: Y,
    options?: Partial<HttpRequest<Y>>
  ): Observable<HttpResponse<T>> {
    return this.request<T, Y>({
      url,
      body,
      method: Methods.PATCH,
      ...options
    });
  }

  delete<T>(url: string, options?: Partial<HttpRequest<null>>): Observable<HttpResponse<T>> {
    return this.request<T, null>({
      url,
      method: Methods.DELETE,
      ...options
    });
  }
}
