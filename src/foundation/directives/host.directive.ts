import {
  Directive, Input, Type,
  TemplateRef, ViewContainerRef
} from '@angular/core';

/**
 * Adds a templateRef to a directive class.
 *
 * ### Example
 *
 * ```html
 * <nav-menu #origin="navigatorMenu">
 *  <template *hostView="origin"></template>
 * </nav>
 * ```
 *
 *
 * @export
 * @class HostTemplateDirective
 */
@Directive({ selector: '[hostView]' })
export class HostTemplateDirective {
  @Input()
  set hostView(directive: Directive) {
    Object.defineProperty(directive, 'templateRef', {
      value: this.templateRef
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) { }
}

export const HOST_DIRECTIVE: any[] = [
  HostTemplateDirective
];
