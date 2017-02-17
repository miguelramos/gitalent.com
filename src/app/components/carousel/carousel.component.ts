import {
  Component, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, ContentChildren, QueryList,
  AfterContentInit, OnDestroy, AfterViewInit,
  ViewChildren, Renderer, NgZone, Injectable,
  AnimationStyles, AnimationKeyframe, EventEmitter,
  AnimationPlayer
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { windowSize } from '../../../foundation';
import { Slide, SlideElement } from './slide.directive';

export interface AnimatorOptions {
  browser: {
    width: number;
    height: number;
  };
  area: number;
  container: HTMLDivElement;
  nav: HTMLDivElement;
  slides: SlideElement[];
  duration: number;
}

@Injectable()
export class Animator {
  set options(options: AnimatorOptions) {
    this._options = options;
  }
  get options() {
    return this._options;
  }

  set animation(animation: AnimationPlayer) {
    this._animation = animation;
  }
  get animation() {
    return this._animation;
  }

  changes: EventEmitter<any> = new EventEmitter();

  private _amount: number = 0;
  private _options: AnimatorOptions;
  private _animation: AnimationPlayer;
  private _next: { slide: SlideElement; index: number; };
  private _current: { slide: SlideElement; index: number; };
  private _previous: { slide: SlideElement; index: number; };

  constructor(private render: Renderer) { }

  start() {
    this._amount = this.options.slides.length;
    this._current = { slide: this.options.slides[0], index: 0 };
    this._next = { slide: this.options.slides[1], index: 1 };

    this.current();
    this.next();
  }

  next() {
    const { slide, index } = this._next;
    const element = <HTMLLIElement>slide.element;
    const position = this.options.browser.width * (index+1);
    const self = this;

    function onDone(): void {
      self._current = { slide: slide, index: index };

      if (index < self._amount-1) {
        self._next = { slide: self._options.slides[index+1], index: index+1}
      } else {
        self._next = { slide: self._options.slides[0], index: 0}
      }

      const timeout = setTimeout(() => {
        self.current();
        self.next();
        clearTimeout(timeout);
        (<any>onDone).animation.destroy();
      }, self.options.duration);
    };

    this.animate(element, position, 0, onDone, { styles: [{ display: 'block' }] }, 800, 75);
  }

  current() {
    const { slide, index } = this._current;
    const element = slide.element;
    const position = this.options.browser.width;
    const self = this;

    function onDone(): void {
      self._previous = { slide: slide, index: index };
      self.render.setElementStyle(element, 'left', `${position*(index+1)}px`);
      (<any>onDone).animation.destroy();
    };

    this.animate(element, 0, -position, onDone, { styles: [{ display: 'block' }] })
  }

  animate(
    element: any,
    begin: number,
    end: number,
    done: () => void,
    initialStyle: { styles: [{}] } = { styles: [{}] },
    duration: number = 800,
    delay: number = 50,
    easing: string = 'ease'
  ) {
    const keyframes: AnimationKeyframe[] = [
      {
        offset: 0,
        styles: {
          styles: [{
            left: `${begin}px`,
          }]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [{
            left: `${end}px`,
          }]
        }
      }
    ];

    const animation = this.render.animate(element, initialStyle, keyframes, duration, delay, easing);
    done['animation'] = animation;
    animation.onDone(done);
    animation.play();
  }
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
  providers: [Animator],
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
  private _interval: number = 5000;
  private _background: string = 'transparent';
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private zone: NgZone,
    private render: Renderer,
    private animator: Animator,
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
        const left = slide.bounds.width * index;

        this.render.setElementStyle(slide.element, 'height', `${options.area}px`);
        this.render.setElementStyle(slide.element, 'left', `${left}px`);
      });
    });

    this.animator.options = Object.assign(
      {}, options, { slides: this.slideElementChildren.toArray(), duration: this._interval }
    );

    setTimeout(() => {
      this.animator.start();
    }, this._interval);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
