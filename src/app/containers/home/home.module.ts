import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './home.routes';
import { HomeContainer } from './home.container';

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeContainer
  ]
})
export class HomeModule { }
