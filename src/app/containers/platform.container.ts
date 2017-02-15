import {
  Component, OnInit, OnDestroy,
  ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';

import {
  State, Configurator, Container,
  Url, UINavbarState, UIFooterState,
  SYMBOLS, Collection, UI
} from '../../foundation';

import { NavService, NavModel, BrandModel, MenuModel } from '../components';

@Component({
  moduleId: module.id,
  selector: 'main-container',
  providers: [NavService],
  templateUrl: './platform.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UI({
  navigator: {
    hasBrand: true,
    hasShadow: true
  }
})
export class PlatformContainer extends Container implements OnInit, OnDestroy {
  navBarOptions: UINavbarState;
  footerOptions: UIFooterState;

  brandModel: BrandModel;
  menuModel: MenuModel[];

  constructor(
    private url: Url,
    private state: State,
    private navService: NavService,
    private configurator: Configurator,
    private detectionStrategy: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    const endpoint = this.url.get(
      SYMBOLS.ENDPOINTS_COMMON_NAV
    );

    this.subscriptions = this.navService.getNavigator(endpoint)
      .subscribe(this.navigatorLoad.bind(this))

    this.state.observe().subscribe((state) => {
      this.navBarOptions = state.UI.NAVBAR;
      this.footerOptions = state.UI.FOOTER;

      this.detectionStrategy.markForCheck();
    });
  }

  navigatorLoad(list: Collection<NavModel>) {
    const navModel = list.first();

    this.brandModel = navModel.getBrand();
    this.menuModel  = navModel.getMenu().all();

    console.log(this.menuModel);
    this.detectionStrategy.markForCheck();
  }

  ngOnDestroy() {
    this.clean();
  }
}
