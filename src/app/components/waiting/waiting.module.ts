import { NgModule } from '@angular/core';
import { MdProgressSpinnerModule } from '@angular/material';

import { ShareModule } from '../../shared';
import { WaitingComponent } from './waiting.component';

@NgModule({
  imports: [ ShareModule, MdProgressSpinnerModule ],
  declarations: [
    WaitingComponent
  ],
  exports: [
    WaitingComponent
  ]
})
export class WaitingModule { }

export * from './waiting.component';
