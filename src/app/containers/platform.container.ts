import {
  Component, OnInit, OnDestroy,
  ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';

import {
  State, Configurator, Container,
  Url, UINavbarState, UIFooterState,
  SYMBOLS
} from '../../foundation';

@Component({
  moduleId: module.id,
  selector: 'main-container',
  templateUrl: './platform.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformContainer extends Container implements OnInit, OnDestroy {
  navBarOptions: UINavbarState;
  footerOptions: UIFooterState;

  constructor(
    private url: Url,
    private state: State,
    private configurator: Configurator,
    private detectionStrategy: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.url.get(
      SYMBOLS.ENDPOINTS_COMMON_FOOT
    );

    this.state.observe().subscribe((state) => {
      this.navBarOptions = state.UI.NAVBAR;
      this.footerOptions = state.UI.FOOTER;
      this.detectionStrategy.markForCheck();
    });
  }

  ngOnDestroy() {
    this.clean();
  }
}
