import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { ApplicationState, UIPageModel } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'ui-root',
  template: `
    <waiting [visibility]="loading"></waiting>
    <div class="ui-container ui-fade-in">
      <navigator *ngIf="(pageState$|async)?.visible"></navigator>
      <h1 *ngIf="(pageState$|async)?.visible">Current state: {{ (state$|async)?.enable }}</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppContainer implements OnInit {
  state$: any;
  pageState$: Observable<UIPageModel>;
  loading = true;

  constructor(
    private router: Router,
    private store: Store<ApplicationState>
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.state$ = this.store.select(state => state.ui.navbar);
    this.pageState$ = this.store.select(state => state.ui.page);

    this.pageState$.subscribe((pageModel) => {
      const timeout = setTimeout(() => {
        this.loading = false;
        clearTimeout(timeout);
      }, 2000);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    /*if (event instanceof NavigationEnd) {
      const timeout = setTimeout(() => {
        this.loading = false;
        clearTimeout(timeout);
      }, 2000);
    }*/

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }

    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
