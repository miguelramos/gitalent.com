import { Directive, TemplateRef, Input } from '@angular/core';
import { HostTemplateDirective } from '../../../foundation';

import { MenuModel, PositionType } from './nav.model';

@Directive({
  selector: 'nav-menu, [nav-menu]',
  exportAs: 'navigatorMenu'
})
export class NavigatorMenu {
  /**
   * Define menu position on navigation menu.
   * Choices are: nav-left, nav-right, nav-center
   *
   * @memberOf NavigatorMenu
   */
  @Input()
  set position(pos: PositionType) {
    this._position = pos;
  }
  get position() {
    return this._position;
  }

  @Input()
  set link(link: string | URL) {
    this._link = link;
  }
  get link() {
    return this._link
  }

  @Input()
  set label(label: string) {
    this._label = label;
  }
  get label() {
    return this._label;
  }

  @Input()
  set classes(classes: string[]) {
    this._classes = classes;
  }
  get classes() {
    return this._classes;
  }

  @Input()
  set active(active: boolean) {
    this._active = active;
  }
  get active() {
    return this._active;
  }

  @Input()
  set enable(enable: boolean) {
    this._enable = enable;
  }
  get enable() {
    return this._enable;
  }

  @Input()
  set icon(icon: string) {
    this._icon = icon;
  }
  get icon() {
    return this._icon;
  }

  /**
   * Defines a custom template to apply on a menu.
   * @see {@link: HostTemplateDirective}
   *
   * @type {TemplateRef<HostTemplateDirective>}
   * @memberOf NavigatorMenu
   */
  public templateRef: TemplateRef<HostTemplateDirective> = null;

  private _icon: string = null;
  private _label: string = null;
  private _active: boolean = false;
  private _enable: boolean = true;
  private _classes: string[] = [];
  private _link: string | URL = null;
  private _position: PositionType = PositionType.LEFT;
}
