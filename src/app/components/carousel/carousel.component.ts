import {
  Component, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, ContentChildren, QueryList,
  AfterContentInit, OnDestroy, AfterViewInit,
  ViewChildren, Renderer, NgZone,
  AnimationStyles, AnimationKeyframe
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

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

  set subscriptions(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  slideContentChildren: QueryList<Slide>;
  slideElementChildren: QueryList<SlideElement>;

  private _height: number;
  private _interval: number = 800;
  private _background: string = 'transparent';
  private _subscriptions: Array<Subscription> = [];

  private _current: number = 0;

  constructor(
    private zone: NgZone,
    private render: Renderer,
    private detectionStrategy: ChangeDetectorRef
  ) {}

  get sliders(): Slide[] {
    return this.slideContentChildren.toArray();
  }

  ngAfterContentInit() {
    this.subscriptions = this.slideContentChildren.changes.subscribe((slide: Slide) => {
      console.log(slide);
      this.detectionStrategy.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.slideElementChildren.forEach((slide: SlideElement, index: number, elements: SlideElement[]) => {
      this.zone.runOutsideAngular(() => {
        const left = slide.bounds.width * index;
        this.render.setElementStyle(slide.element, 'left', `${left}px`);
      });
    });

    setTimeout(() => {
      const slide = this.slideElementChildren.first;
      this.animate(slide, 0, -slide.bounds.width);
    }, 500);
  }

  animate(slide: SlideElement, initialPosition: number, finalPosition: number) {
    const amount = this.slideElementChildren.toArray().length;
    //const currentSlide = this.slideElementChildren.toArray()[this._current];
    //const nextSlide = this.slideElementChildren.toArray()[this._current + 1];

    const startingStyles: AnimationStyles = { styles: [{}] };

    const keyframes: AnimationKeyframe[] = [
      {
        offset: 0,
        styles: {
          styles: [{
            left: `${initialPosition}px`,
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            left: `${finalPosition}px`,
          }]
        }
      }
    ];

    const animation = this.render.animate(slide.element, startingStyles, keyframes, 3000, 200, 'ease');

    animation.onStart(() => { });

    animation.onDone(() => {
      this._current = this._current + 1

      if (this._current >= amount) {
        this._current = 0
      }

      const nextSlide = this.slideElementChildren.toArray()[this._current];
      this.animate(nextSlide, nextSlide.bounds.left, 0);
    });

    animation.play();

    /*if (animation.hasStarted()) {
      this._current = this._current + 1

      if (this._current >= amount) {
        this._current = 0
      }

      const nextSlide = this.slideElementChildren.toArray()[this._current];
      this.animate(nextSlide, nextSlide.bounds.left, 0);
    }*/
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
