import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';

export interface HttpResponse<T> extends AjaxResponse {
  response: T;
}

export interface HttpRequest<T> extends AjaxRequest {
  body: T;
}

export interface RequestInterceptor {
  <T>(options: Partial<HttpRequest<T>>): Partial<HttpRequest<T>>;
}

export interface ResponseInterceptor {
  <T>(response: HttpResponse<T>): HttpResponse<T>;
}

export interface Interceptors {
  request: RequestInterceptor[];
  response: ResponseInterceptor[];
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface HttpOptions {
  baseUrl: string | undefined;
}
