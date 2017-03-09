import { BrowserModule } from '@angular/platform-browser';

import { ROUTING } from './app.routing';
import { NavigatorModule, WaitingModule } from './components';
import { CoreModule, ShareModule } from './shared';


export const PLATFORM_MODULES = [
  ROUTING,
  BrowserModule,
  ShareModule,
  WaitingModule,
  NavigatorModule,
  CoreModule.forRoot()
];
