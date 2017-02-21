import {
  Injectable, AnimationStyles, AnimationKeyframe,
  EventEmitter, AnimationPlayer, Renderer
} from '@angular/core';
import { AnimationDriver } from '@angular/platform-browser'

import { SlideElement } from './slide.directive';

export interface AnimationOptions {
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
export class Animation {
  set options(options: AnimationOptions) {
    this._options = options;
  }
  get options() {
    return this._options;
  }

  animations: AnimationPlayer[];
  changes: EventEmitter<any> = new EventEmitter();

  private _amount: number = 0;
  private _options: AnimationOptions;

  private _next: number = 1;
  private _current: number = 0;
  private _previous: number = -1;

  constructor(
    private render: Renderer
  ) { }

  init() {
    this.animations = this.createAnimations(this.options.slides);
    this._amount = this.animations.length - 1;
    //TODO: Autoplay option
    this.start();
  }

  createKeyFrames(start: string, end: string) {
    const keyframes: AnimationKeyframe[] = [];

    keyframes.push(
      {
        offset: 0,
        styles: {
          styles: [
            { left: start }
          ]
        }
      },
      {
        offset: 1,
        styles: {
          styles: [
            { left: end }
          ]
        }
      }
    );

    return keyframes;
  }

  createAnimations(slides: SlideElement[]) {
    const animations: AnimationPlayer[] = [];

    slides.forEach((slide, index) => {
      animations.push(
        this.render.animate(
          slide.element,
          { styles: [{ display: 'block' }] },
          this.createKeyFrames(slide.element.style.left, '0px'),
          800,
          0,
          'cubic-bezier(.35,.45,.5,1)'
        ),
        this.render.animate(
          slide.element,
          { styles: [{ display: 'block' }] },
          this.createKeyFrames('0px', `-${slide.element.style.left}`),
          800,
          0,
          'cubic-bezier(.35,.45,.5,1)'
        )
      );
    });

    return animations;
  }

  start() {
    const end = () => {
      const next = this._next;
      const current = this._current;

      this.steping(next, next+1);

      this.animations[next].onDone(() => {
        this.animations[current].finish();
        this.animations[current].reset();
        this.animations[next].finish();
        this.animations[next].reset();
      });

      this.animations[next].play();
    }

    const begin = () => {
      const current = this._current;

      this.animations[current].onDone(() => {
        const timeout = setTimeout(() => {
          end();
          begin();
          clearTimeout(timeout);
        }, this.options.duration);
      });

      this.animations[current].play();
    }

    begin();
  }

  private steping(current, next) {
    this._current = current < this._amount ? current + 1 : 0;
    this._next = next < this._amount ? next + 1 : 1;
    this._previous = this._current - 1;
  }

  /*next() {
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
  }*/
}
