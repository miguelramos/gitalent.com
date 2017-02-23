import {
  Component, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, ContentChildren, QueryList,
  AfterContentInit, OnDestroy, AfterViewInit,
  ViewChildren, Renderer, NgZone, OnChanges,
  SimpleChanges, SimpleChange
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Animation } from './animation';
import { windowSize } from '../../../foundation';
import { Slide, SlideElement } from './slide.directive';

export interface CarouselChanges extends SimpleChanges {
  height?: SimpleChange;
  background?: SimpleChange;
  interval?: SimpleChange;
  autoplay?: SimpleChange;
  gutter?: SimpleChange
}

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
export class Carousel implements OnDestroy, OnChanges, AfterContentInit, AfterViewInit {
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
    this.detectionStrategy.markForCheck();
  }
  get autoplay() {
    return this._autoplay;
  }

  @Input()
  set gutter(gutter: number) {
    this._gutter = gutter;
    this.detectionStrategy.markForCheck();
  }
  get gutter() {
    return this._gutter;
  }

  set subscriptions(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  slideContentChildren: QueryList<Slide>;
  slideElementChildren: QueryList<SlideElement>;

  private _height: number;
  private _gutter: number = 0;
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

    const areaSize = browserSize.height - this.gutter;
    console.log(areaSize, browserSize.height, this.gutter);
    return {
      browser: browserSize,
      area: areaSize
    }
  }

  containerSetup() {
    const options = this.descriptor()
    const container = <HTMLDivElement>document.querySelector('.carousel');
    this.render.setElementStyle(container, 'height', `${options.area}px`);
  }

  ngOnChanges(changes: CarouselChanges) {
    if (changes.gutter) {
      this.gutter = changes.gutter.currentValue;
      this.containerSetup();
      this.detectionStrategy.markForCheck();
    }
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
