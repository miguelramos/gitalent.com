import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './home.routes';
import { ShareModule } from '../../../foundation';
import { HomeContainer } from './home.container';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [
    HomeContainer
  ]
})
export class HomeModule { }
