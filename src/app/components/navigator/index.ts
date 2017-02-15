import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';

import { NavigatorMenu } from './menu.directive';
import { Navigator } from './navigator.component';
import { ShareModule } from '../../../foundation';

export * from './nav.model';
export * from './nav.service';

@NgModule({
  id: module.id,
  imports: [ShareModule],
  exports: [Navigator, NavigatorMenu],
  declarations: [Navigator, NavigatorMenu],
})
export class NavigatorModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NavigatorModule,
      providers: []
    };
  }
}
