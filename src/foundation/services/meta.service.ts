import {
  Http, XHRBackend, BaseRequestOptions, BaseResponseOptions, RequestOptionsArgs,
  RequestOptions, ResponseOptions, BrowserXhr, XSRFStrategy, CookieXSRFStrategy,
  Request
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { createAndResolve, authorizeHeaders } from '../support';
import { RestService, ResourceResponse, HttpSignature } from './rest.service';

export function factoryHttp(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new Http(xhrBackend, requestOptions);
}

export function factoryCookieXSRFStrategy(): CookieXSRFStrategy {
  return new CookieXSRFStrategy();
}

const HTTP_PROVIDERS = [
  { provide: Http, useFactory: factoryHttp, deps: [XHRBackend, RequestOptions] },
  BrowserXhr,
  { provide: RequestOptions, useClass: BaseRequestOptions },
  { provide: ResponseOptions, useClass: BaseResponseOptions },
  XHRBackend,
  { provide: XSRFStrategy, useFactory: factoryCookieXSRFStrategy },
];

export interface HttpRest extends HttpSignature {
  authHeaders(): RequestOptions;
}

export function Rest(meta?: { authHeaders?: RequestOptions; }): any {
  let settings = Object.assign({}, meta || {
    authHeaders: null
  });

  if (!settings.authHeaders) {
    settings.authHeaders = authorizeHeaders();
  }

  let providers = createAndResolve([
    HTTP_PROVIDERS,
    RestService
  ]);

  let service: RestService = providers.get(RestService);
  // const { get, post, put, delete, patch, request } = RestService.prototype;

  return function(target: Function): Function {
    Object.defineProperties(target.prototype, {
      get: {
        value: function (path: string, params?: RequestOptionsArgs): Observable<ResourceResponse> {
          return RestService.prototype.get.apply(service, arguments);
        }
      },
      post: {
        value: function (path: string, params?: any, options?: RequestOptionsArgs): Observable<ResourceResponse> {
          return RestService.prototype.post.apply(service, arguments);
        }
      },
      put: {
        value: function (path: string, params?: any, options?: RequestOptionsArgs): Observable<ResourceResponse> {
          return RestService.prototype.put.apply(service, arguments);
        }
      },
      delete: {
        value: function (path: string, params?: RequestOptionsArgs): Observable<ResourceResponse> {
          return RestService.prototype.delete.apply(service, arguments);
        }
      },
      patch: {
        value: function (path: string, body?: any, options?: RequestOptionsArgs): Observable<ResourceResponse> {
          return RestService.prototype.patch.apply(service, arguments);
        }
      },
      request: {
        value: function (url: string | Request, options?: RequestOptionsArgs): Observable<ResourceResponse> {
          return RestService.prototype.request.apply(service, arguments);
        }
      },
      authHeaders: {
        value: function () {
          return settings.authHeaders;
        }
      }
    });

    return target;
  };
}
