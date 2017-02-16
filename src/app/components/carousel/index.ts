import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';

import { Slide, SlideElement } from './slide.directive';
import { Carousel } from './carousel.component';
import { ShareModule } from '../../../foundation';

@NgModule({
  id: module.id,
  imports: [ShareModule],
  exports: [Slide, SlideElement, Carousel],
  declarations: [Slide, SlideElement, Carousel],
})
export class CarouselModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CarouselModule,
      providers: []
    };
  }
}
