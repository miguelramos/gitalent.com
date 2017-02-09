import { ApplicationRef, NgModule, Injector } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { AppContainer } from './app.container';
import {
  State, InternalState, Framework,
  Configurator, SYMBOLS, UIState
} from '../foundation';

import { APP_PROVIDERS, APP_IMPORTS } from './app.provision';

type StoreType = {
  state: InternalState,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * App module for bootstrapping application.
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppContainer
  ],
  imports: [
    APP_IMPORTS
  ],
  bootstrap: [AppContainer],
  providers: [
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appState: State,
    public injector: Injector,
    public appRef: ApplicationRef,
    public configurator: Configurator
  ) {
    Framework.setMainApplication(appRef);
    Framework.setApplicationInjector(injector);

    this.initState();
  }

  initState() {
    let initialState = this.configurator.getOptionTree<UIState>(SYMBOLS.STATE, false);

    this.appState.set(SYMBOLS.UI_STATE_FOOTER, initialState.FOOTER);
    this.appState.set(SYMBOLS.UI_STATE_NAVBAR, initialState.NAVBAR);

    this.configurator.setOption(SYMBOLS.ENVIRONMENT, ENV);
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.group('STAT STORE TYPE');
    console.log('HMR store', JSON.stringify(store, null, 2));
    console.groupEnd();
    // set state
    this.appState.state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState.state;

    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
