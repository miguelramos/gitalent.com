import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { PlatformContainerModule } from './containers';
import { CoreModule, State, CONFIGTOKEN } from '../foundation';

/**
 * Factory for Configurator dependency
 * injection. Loads default configuration and
 * is intend to populate Configurator with options
 * for each environment.
 *
 * @export
 * @returns Object
 */
export function configFactory() {
  return require('../config.js');
}

/**
 * Const with minimum framework requires to be imported
 * on app module.
 */
export const FRAMEWORK_PROVIDERS = [
  RouterModule,
  BrowserModule
];

/**
 * Initial providers for core module. This will
 * build singleton instances.
 */
export const APP_PROVIDERS = [
  State,
  { provide: CONFIGTOKEN, useFactory: configFactory },
];

/**
 * Initials imports on app module.
 */
export const APP_IMPORTS = [
  ...FRAMEWORK_PROVIDERS,
  CoreModule.forRoot(),
  PlatformContainerModule
];
