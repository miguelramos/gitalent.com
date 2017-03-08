import { BrowserModule } from '@angular/platform-browser';

import { CoreModule, ShareModule } from './shared';
import { ROUTING } from './app.routing';

export const PLATFORM_MODULES = [
  ROUTING,
  BrowserModule,
  ShareModule,
  CoreModule.forRoot()
];
