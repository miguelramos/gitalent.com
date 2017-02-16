import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './home.routes';
import { ShareModule } from '../../../foundation';
import { HomeContainer } from './home.container';
import { CarouselModule } from '../../components';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ShareModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    HomeContainer
  ]
})
export class HomeModule { }
