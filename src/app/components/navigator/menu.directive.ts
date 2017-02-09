import { Directive, TemplateRef, Input } from '@angular/core';
import { HostTemplateDirective } from '../../../foundation';
/**
 * Interface for typing item/model
 * of menus to present on navbar.
 *
 * @export
 * @interface MenuResource
 */
export interface MenuResource {
  classes?: string[];
  html?: HTMLElement;
  text?: string;
  link?: string;
  active: boolean;
}

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
  set position(pos: string) {
    this._position = pos;
  }
  get position() {
    return this._position;
  }

  /**
   * Define item/anchors for the navigation menu.
   * Model as @see {@link: MenuResource}
   *
   * @memberOf NavigatorMenu
   */
  @Input()
  set items(items: MenuResource[]) {
    this._items = items;
  }
  get items() {
    return this._items;
  }

  /**
   * Defines a custom template to apply on a menu.
   * @see {@link: HostTemplateDirective}
   *
   * @type {TemplateRef<HostTemplateDirective>}
   * @memberOf NavigatorMenu
   */
  public templateRef: TemplateRef<HostTemplateDirective> = null;

  private _items: MenuResource[];
  private _position: string = 'nav-left';
}
