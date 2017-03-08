import {
  Component, ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { UINavBarAction, ApplicationState } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'ui-home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainer {
  title = 'Homepage';

  constructor(
    private store: Store<ApplicationState>
  ) {}

  changeState() {
    this.store.dispatch(new UINavBarAction({enable: false}));
  }
}
