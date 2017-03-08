import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { ApplicationState } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'ui-root',
  template: `
    <h1>Current state: {{ (state$|async)?.enable }}</h1>
    <router-outlet></router-outlet>
  `
})
export class AppContainer implements OnInit {
  state$: any;

  constructor(
    private store: Store<ApplicationState>
  ) {}

  ngOnInit() {
    this.state$ = this.store.select(state => state.ui.navbar);

    this.state$.subscribe((navbarModel) => {
      console.log(navbarModel);
    });
  }
}
