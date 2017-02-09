import '../tools/rxjs.imports';
import '../tools/vendors.browser';
import '../tools/polyfills.browser.aot';

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './compile/src/app/app.module.ngfactory';

if ('production' === ENV) {
  enableProdMode();
}

export function main() {
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch((error) => {
      console.group('PLATFORM EXCEPTION');
      console.dir(error);
      console.groupEnd();
    });
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
