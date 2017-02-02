import { Injectable } from '@angular/core';

import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export interface ServiceFork<T> {
  [index: number]: T;
}

@Injectable()
export abstract class Container {

  private subscriptionsList: Array<Subscription> = [];

  constructor() {}

  /**
   * Work around for issue expression has changed after checked
   * https://github.com/angular/angular/issues/6005#issuecomment-233547490
   *
   * @param {Function} fn
   * @param {Array<any>} [args]
   * @param {Object} [context]
   */
  changeDetection(fn: Function, args?: Array<any>, context?: Object): void {
    setTimeout(
      () => {
        let params: Array<any> = args ? args : [];
        let self: Object = context ? context : this;
        fn.apply(self, params);
      },
      0
    );
  }

  set subscriptions(value: Subscription) {
    this.subscriptionsList.push(value);
  }

  clean(): void {
    this.subscriptionsList.map((subscription) => {
      subscription.unsubscribe();
    });
  }

  fork(...observables): Observable<ServiceFork<any>> {
    return Observable.forkJoin(...observables);
  }
}
