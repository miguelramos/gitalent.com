import { Http } from '@angular/http';
import { OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import {
  TranslateModule, TranslateLoader, TranslateStaticLoader, TranslatePipe, TranslateService
} from 'ng2-translate/ng2-translate';

import { SYMBOLS } from '../support';
import { Configurator, Url, Domain } from '../system';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export const CONFIGTOKEN = new OpaqueToken('CONFIGTOKEN');

export function configuratorFactory(options: Configurator) {
  return new Configurator(options);
}

export function urlFactory(configurator: Configurator) {
  return new Url(configurator);
}

export function domainFactory() {
  return new Domain();
}

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
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: Configurator,
          useFactory: configuratorFactory,
          deps: [ CONFIGTOKEN ]
        },
        {
          provide: Url,
          useFactory: urlFactory,
          deps: [ Configurator ]
        },
        {
          provide: Domain,
          useFactory: domainFactory
        }
      ]
    };
  }

  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule,
    private translate: TranslateService,
    private configurator: Configurator
  ) {
    const defaultLanguage = this.configurator.getOption(SYMBOLS.LANG_DEFAULT);

    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(defaultLanguage);

    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
