import {
  Component, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, ContentChildren, QueryList,
  AfterContentInit, OnDestroy, AfterViewInit,
  ViewChildren, Renderer, NgZone
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Animation } from './animation';
import { windowSize } from '../../../foundation';
import { Slide, SlideElement } from './slide.directive';

@Component({
  moduleId: module.id,
  selector: 'gt-carousel',
  queries: {
    slideContentChildren: new ContentChildren(Slide),
    slideElementChildren: new ViewChildren(SlideElement)
  },
  templateUrl: 'carousel.template.html',
  styleUrls: ['carousel.css'],
  providers: [Animation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel implements OnDestroy, AfterContentInit, AfterViewInit {
  @Input()
  set height(height: number) {
    this._height = height;
    this.detectionStrategy.markForCheck();
  }
  get height() {
    return this._height;
  }

  @Input()
  set background(background: string) {
    this._background = background;
    this.detectionStrategy.markForCheck();
  }
  get background() {
    return this._background;
  }

  @Input()
  set interval(interval: number) {
    this._interval = interval;
    this.detectionStrategy.markForCheck();
  }
  get interval() {
    return this._interval;
  }

  @Input()
  set autoplay(autoplay: boolean) {
    this._autoplay = autoplay;
  }
  get autoplay() {
    return this._autoplay;
  }

  set subscriptions(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  slideContentChildren: QueryList<Slide>;
  slideElementChildren: QueryList<SlideElement>;

  private _height: number;
  private _autoplay: boolean = true;
  private _interval: number = 5000;
  private _background: string = 'transparent';
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private zone: NgZone,
    private render: Renderer,
    private animator: Animation,
    private detectionStrategy: ChangeDetectorRef
  ) {}

  get sliders(): Slide[] {
    return this.slideContentChildren.toArray();
  }

  descriptor() {
    const browserSize = windowSize();
    const container = <HTMLDivElement>document.querySelector('.carousel');
    const navbar = <HTMLDivElement>document.querySelector('nav.nav');
    const areaSize = browserSize.height - navbar.clientHeight;

    return {
      browser: browserSize,
      area: areaSize,
      container: container,
      nav: navbar
    }
  }

  containerSetup() {
    const options = this.descriptor()

    this.render.setElementStyle(options.container, 'height', `${options.area}px`);
  }

  ngAfterContentInit() {
    this.subscriptions = this.slideContentChildren.changes.subscribe((slide: Slide) => {
      this.detectionStrategy.markForCheck();
    });
  }

  ngAfterViewInit() {
    const options = this.descriptor();
    this.containerSetup();

    this.slideElementChildren.forEach((slide: SlideElement, index: number, elements: SlideElement[]) => {
      this.zone.runOutsideAngular(() => {
        const left = slide.bounds.width;// * index;

        this.render.setElementStyle(slide.element, 'height', `${options.area}px`);
        this.render.setElementStyle(slide.element, 'left', `${left}px`);
      });
    });

    this.animator.options = Object.assign(
      {}, options, {
        slides: this.slideElementChildren.toArray(),
        duration: this.interval,
        autoplay: this.autoplay
      }
    );

    this.animator.init();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
