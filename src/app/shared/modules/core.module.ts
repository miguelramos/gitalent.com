import { Http } from '@angular/http';
import { OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import {
  TranslateModule, TranslateLoader, TranslateStaticLoader, TranslatePipe, TranslateService
} from 'ng2-translate/ng2-translate';

import { Configurator } from '../lib/configurator';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function configFactory() {
  return require('../../../config.js');
}

export const CONFIGTOKEN = new OpaqueToken('CONFIGTOKEN');

export function configuratorFactory(options: Configurator) {
  return new Configurator(options);
}

export const CONFIG_PROVIDER = [
  { provide: CONFIGTOKEN, useFactory: configFactory },
  { provide: Configurator, useFactory: configuratorFactory, deps: [ CONFIGTOKEN ] }
];

/*export function urlFactory(configurator: Configurator) {
  return new Url(configurator);
}*/

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [ Http ]
    })
  ],
  exports: [
    TranslateModule, TranslatePipe
  ],
  providers: [
    CONFIG_PROVIDER
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        /*{
          provide: Url,
          useFactory: urlFactory,
          deps: [ Configurator ]
        }*/
      ]
    };
  }

  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule,
    private translate: TranslateService,
    private configurator: Configurator
  ) {
    const defaultLanguage = this.configurator.getOption('LANG.DEFAULT');

    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(defaultLanguage);

    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
