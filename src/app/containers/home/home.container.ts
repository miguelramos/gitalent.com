import {
  Component, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { UINavBarAction, ApplicationState, UIPageAction, Animation } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'ui-home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html',
  host: { '[@PageAnimation]': 'true' },
  animations: Animation.PAGE,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainer implements AfterViewInit {
  title = 'Homepage';

  constructor(
    private store: Store<ApplicationState>
  ) {}

  changeState() {
    this.store.dispatch(new UINavBarAction({enable: false}));
  }

  ngAfterViewInit() {
    this.store.dispatch(new UIPageAction({ visible: true }));
  }
}
