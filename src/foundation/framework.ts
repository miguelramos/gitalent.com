import { Injectable, ApplicationRef, Injector } from '@angular/core';

@Injectable()
export class Framework {
  private static application: ApplicationRef;
  private static injector: Injector;

  public static setMainApplication(app: ApplicationRef) {
    this.application = app;
  }

  public static getMainApplication(): ApplicationRef {
    return this.application;
  }

  public static setApplicationInjector(injector: Injector) {
    this.injector = injector;
  }

  public static getApplicationInjector() {
    return this.injector;
  }
}
