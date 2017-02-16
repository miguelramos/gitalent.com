import {
  Component, Input, HostBinding, AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  ContentChildren, QueryList, OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { BrandModel, PositionType } from './nav.model';
import { NavigatorMenu } from './menu.directive';

export interface NavigatorOptions {
  hasShadow: boolean;
  hasBrand: boolean;
}

export const NavigatorOptions = <NavigatorOptions>{
  hasShadow: false,
  hasBrand: true
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
export class Navigator implements AfterContentInit, OnDestroy {

  /**
   * Input options for main nav bar. Current options:
   * - hasShadow: apply shadow to main navbar
   *
   * @memberOf Navigator
   */
  @Input()
  set options(config: NavigatorOptions) {
    this._options = Object.assign({}, NavigatorOptions, config);
    this.detectionStrategy.markForCheck();
  }
  get options() {
    return this._options;
  }

  /**
   * Input model for brand. @see {@link BrandModel}.
   * Data model to apply logo and other info to menu.
   *
   *
   * @memberOf Navigator
   */
  @Input()
  set brand(model: BrandModel) {
    this._brandModel = model;
    this.detectionStrategy.markForCheck();
  }
  get brand() {
    return this._brandModel;
  }

  set subscriptions(subscription: Subscription) {
    this._subscriptions.push(subscription);
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
  private _subscriptions: Array<Subscription> = [];
  /**
   * Private class brand Model @see {@link BrandModel}
   *
   * @private
   * @type {BrandModel}
   * @memberOf Navigator
   */
  private _brandModel: BrandModel;

  left: PositionType  = PositionType.LEFT;
  right: PositionType = PositionType.RIGHT;

  get menuList(): NavigatorMenu[] {
    return this.navMenuContentChildren.toArray();
  }

  constructor(
    private detectionStrategy: ChangeDetectorRef
  ) {
    this.options = NavigatorOptions;
    this.detectionStrategy.detach();
  }

  ngAfterContentInit() {
    this.subscriptions = this.navMenuContentChildren.changes.subscribe((d) => {
      this.detectionStrategy.markForCheck();
    });
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
