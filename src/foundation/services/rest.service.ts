import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {
  Http, Request, RequestOptionsArgs, Response, Headers, ResponseType
} from '@angular/http';

export interface HttpSignature {
  get(path: string, params?: RequestOptionsArgs): Observable<ResourceResponse>;
  post(path: string, params?: any, options?: RequestOptionsArgs): Observable<ResourceResponse>;
  put(path: string, params?: any, options?: RequestOptionsArgs): Observable<ResourceResponse>;
  delete(path: string, params?: RequestOptionsArgs): Observable<ResourceResponse>;
  patch(path: string, body?: any, options?: RequestOptionsArgs): Observable<ResourceResponse>;
}

export interface DataResource { }

export interface JsonResource {
  data?: DataResource | DataResource[];
  meta?: {
    page_size: number;
    length: number;
  };
  links?: {
    self: string;
    first: string;
    prev: string;
    next: string;
  };
  options?: any;
  errors?: {
    status: number;
    detail: string;
  }[];
}

/**
 * Rest response resource signature
 *
 * @export
 * @interface ResourceResponse
 */
export interface ResourceResponse {
  headers: Headers;
  type: ResponseType;
  status: number;
  payload?: JsonResource;
  ok: boolean;
}

/**
 * Defines Rest adapter driver to comunicate
 * with REST API services.
 *
 * @export
 * @class RestService
 * @implements {HttpSignature}
 */
@Injectable()
export class RestService implements HttpSignature {

  constructor( @Inject(Http) private http: Http ) {}

  /**
   * Transform Rest resources on the signature
   * of ResourceResponse.
   *
   * @protected
   * @param {Response} response
   * @returns {ResourceResponse}
   */
  protected _toResponse(response: Response): ResourceResponse {
    let json;

    try {
      json = response.json();
    } catch (error) {
      json = {};
    }

    return {
      headers: response.headers,
      payload: json,
      status: response.status,
      type: response.type,
      ok: response.ok
    };
  }

  /**
   * Interceptor for Http errors.
   *
   * @protected
   * @param {*} error
   * @returns {ErrorObservable}
   */
  protected handleError(error: any): ErrorObservable<any> {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //console.error(errMsg); // log to console instead

    return Observable.throw(error);
  }

  /**
   * Generic method to make Http requests.
   *
   * @param {(string | Request)} url
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<any>}
   */
  public request(url: string | Request, options?: RequestOptionsArgs): Observable<ResourceResponse> {
      return this.http.request(url, options).map(this._toResponse).catch(this.handleError);
  }

  /**
   * Http get method.
   *
   * @param {string} path
   * @param {RequestOptionsArgs} params
   * @returns {Observable<ResourceResponse>}
   */
  public get(path: string, params?: RequestOptionsArgs): Observable<ResourceResponse> {
    return this.http.get(path, params).map(this._toResponse).catch(this.handleError);
  }

  /**
   * Http post method.
   *
   * @param {string} path
   * @param {*} params
   * @param {RequestOptionsArgs} options
   * @returns {Observable<ResourceResponse>}
   */
  /* tslint:disable */
  public post(path: string, params?: any, options?: RequestOptionsArgs): Observable<ResourceResponse> {
    return this.http.post(path, params, options).map(this._toResponse).catch(this.handleError);
  }
  /* tslint:enable */

  /**
   * Http put method.
   *
   * @param {string} path
   * @param {*} params
   * @param {RequestOptionsArgs} options
   * @returns {Observable<ResourceResponse>}
   */
  public put(path: string, params: any, options: RequestOptionsArgs): Observable<ResourceResponse> {
    return this.http.put(path, params).map(this._toResponse).catch(this.handleError);
  }

  /**
   * Http delete method.
   *
   * @param {string} path
   * @param {RequestOptionsArgs} params
   * @returns {Observable<ResourceResponse>}
   */
  public delete(path: string, params: RequestOptionsArgs): Observable<ResourceResponse> {
    return this.http.delete(path, params).map(this._toResponse).catch(this.handleError);
  }

  /**
   * Http patch method.
   *
   * @param {string} path
   * @param {*} [body]
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<ResourceResponse>}
   */
  public patch(path: string, body?: any, options?: RequestOptionsArgs): Observable<ResourceResponse> {
    return this.http.patch(path, body, options).map(this._toResponse).catch(this.handleError);
  }
}
