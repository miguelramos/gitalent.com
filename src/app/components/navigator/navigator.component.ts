import {
  Component, Input, HostBinding, OnChanges,
  ChangeDetectionStrategy, ChangeDetectorRef,
  ContentChildren, QueryList
} from '@angular/core';

import { NavigatorMenu } from './menu.directive';

export interface NavigatorOptions {
  hasShadow: boolean;
}

export const NavigatorOptions = <NavigatorOptions>{
  hasShadow: false
}

@Component({
  moduleId: module.id,
  selector: 'gt-nav',
  queries: {
    navMenuContentChildren: new ContentChildren(NavigatorMenu),
  },
  templateUrl: 'navigator.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navigator {

  /**
   * Input options for main nav bar. Current options:
   * - hasShadow: apply shadow to main navbar
   *
   * @memberOf Navigator
   */
  @Input()
  set options(config: NavigatorOptions) {
    this._options = config;
    this.detectionStrategy.markForCheck();
  }
  get options() {
    return this._options;
  }

  navMenuContentChildren: QueryList<NavigatorMenu>;

  /**
   * Private class options @see {@link options}
   *
   * @private
   * @type {NavigatorOptions}
   * @memberOf Navigator
   */
  private _options: NavigatorOptions;

  constructor(
    private detectionStrategy: ChangeDetectorRef
  ) {
    this.options = NavigatorOptions;
    this.detectionStrategy.detach();
  }

  ngAfterContentInit() {
    console.log(this.navMenuContentChildren);
  }
}
