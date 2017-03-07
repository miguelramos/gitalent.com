import { NgModule, ApplicationRef } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApplicationReducer } from './app.store';
import { PLATFORM_MODULES } from './app.provision';

import { AppContainer } from './containers/app.container';

@NgModule({
  declarations: [AppContainer],
  imports: [
    PLATFORM_MODULES,
    StoreModule.provideStore(ApplicationReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [AppContainer]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
    console.log(appRef);
  }
}
