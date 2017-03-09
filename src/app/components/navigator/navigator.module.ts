import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';

import { ShareModule } from '../../shared';
import { NavigatorComponent } from './navigator.component';

@NgModule({
  imports: [ ShareModule, MdToolbarModule ],
  declarations: [
    NavigatorComponent
  ],
  exports: [
    NavigatorComponent
  ]
})
export class NavigatorModule { }

export * from './navigator.component';
