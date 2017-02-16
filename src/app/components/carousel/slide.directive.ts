import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Directive, TemplateRef, Input, ElementRef, ViewChild } from '@angular/core';

import { HostTemplateDirective } from '../../../foundation';

@Directive({
  selector: 'slide-tag, [slide-tag]',
  exportAs: 'slideTag'
})
export class Slide {
  @Input()
  set title(title: string) {
    this._title = title;
  }
  get title() {
    return this._title;
  }

  @Input()
  set image(image: any) {
    this._image = this.sanitizer.bypassSecurityTrustStyle(`url('${image}')`);
  }
  get image() {
    return this._image;
  }

  private _slideElement: SlideElement;

  private _title: string = null;
  private _image: SafeStyle = null;

  public templateRef: TemplateRef<HostTemplateDirective> = null;

  constructor(
    private sanitizer: DomSanitizer
  ) {}
}

@Directive({
  selector: 'slide-element, [slide-element]',
  exportAs: 'slideElement'
})
export class SlideElement {
  constructor(
    private elementRef: ElementRef
  ) {}

  get bounds() {
    return (<HTMLLIElement>this.elementRef.nativeElement).getBoundingClientRect();
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  get ref() {
    return this.elementRef;
  }
}
