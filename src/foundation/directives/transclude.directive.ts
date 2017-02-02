import {
  Directive, Input, TemplateRef, ViewContainerRef
} from '@angular/core';

export interface KeyAttribute {
  [key: string]: any;
}

@Directive({
  selector: '[transclude]'
})
export class TranscludeDirective {
  public viewRef: ViewContainerRef;

  protected _ngTransclude: TemplateRef<any>;

  @Input() public set transclude(templateRef: TemplateRef<any>) {
    this._ngTransclude = templateRef;

    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  public get transclude(): TemplateRef<any> {
    return this._ngTransclude;
  }

  public constructor(protected _viewRef: ViewContainerRef) {
    this.viewRef = _viewRef;
  }
}

export const TRANSCLUDE_DIRECTIVE: any[] = [
  TranscludeDirective
];
