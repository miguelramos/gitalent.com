import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { NavModel } from './nav.model';
import { Collection } from '../../../foundation/models';
import { Rest, HttpRest } from '../../../foundation/services';

export interface NavService extends HttpRest { }

@Rest()
@Injectable()
export class NavService {
  getNavigator(url: string, params?: RequestOptions): Observable<Collection<NavModel>> {
    return this.get(url, params).flatMap(
      (resource) => {
        return Observable.of(new Collection<NavModel>(resource.payload.data, NavModel));
      }
    )
  }
}
