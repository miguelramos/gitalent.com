import {
  trigger, keyframes, animate, transition, style,
  AnimationEntryMetadata, AnimationStyleMetadata,
  Injectable
} from '@angular/core';

/**
 * Animations on:
 * https://web-animations.github.io/web-animations-demos/#animate_css/
 */
const EFFECTS = {
  BOUNCE: {
    ENTER: [
      style({ transform: 'translate3d(0,0,0)', offset: 0 }),
      style({ transform: 'translate3d(0,0,0)', offset: 0.2 }),
      style({ transform: 'translate3d(0,-30px,0)', offset: 0.4 }),
      style({ transform: 'translate3d(0,-30px,0)', offset: 0.43 }),
      style({ transform: 'translate3d(0,0,0)', offset: 0.53 }),
      style({ transform: 'translate3d(0,-15px,0)', offset: 0.7 }),
      style({ transform: 'translate3d(0,0,0)', offset: 0.8 }),
      style({ transform: 'translate3d(0,-15px,0)', offset: 0.9 }),
      style({ transform: 'translate3d(0,0,0)', offset: 1 })
    ],
    LEAVE: [
      style({ transform: 'translate3d(0,0,0)', offset: 1 }),
      style({ transform: 'translate3d(0,-15px,0)', offset: 0.9 }),
      style({ transform: 'translate3d(0,0,0)', offset: 0.8 }),
      style({ transform: 'translate3d(0,-15px,0)', offset: 0.7 }),
      style({ transform: 'translate3d(0,0,0)', offset: 0.53 }),
      style({ transform: 'translate3d(0,-30px,0)', offset: 0.43 }),
      style({ transform: 'translate3d(0,-30px,0)', offset: 0.4 }),
      style({ transform: 'translate3d(0,0,0)', offset: 0.2 }),
      style({ transform: 'translate3d(0,0,0)', offset: 0 })
    ],
    IN: [
      style({transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 0}),
      style({transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2}),
      style({transform: 'scale3d(.9, .9, .9)', offset: 0.4}),
      style({transform: 'scale3d(1.03, 1.03, 1.03)', opacity: '1', offset: 0.6}),
      style({transform: 'scale3d(.97, .97, .97)', offset: 0.8}),
      style({transform: 'scale3d(1, 1, 1)', opacity: '1', offset: 1})
    ],
    OUT: [
      style({transform: 'none', opacity: '1', offset: 0}),
      style({transform: 'scale3d(.9, .9, .9)', opacity: '1', offset: 0.2}),
      style({transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.5}),
      style({transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.55}),
      style({transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 1})
    ],
    INDOWN: [
      style({transform: 'translate3d(0, -3000px, 0)', opacity: '0', offset: 0}),
      style({transform: 'translate3d(0, 25px, 0)', opacity: '1', offset: 0.6}),
      style({transform: 'translate3d(0, -100px, 0)', offset: 0.75}),
      style({transform: 'translate3d(0, 5px, 0)', offset: 0.9}),
      style({transform: 'none', opacity: '1', offset: 1})
    ],
    OUTDOWN: [
      style({transform: 'none', opacity: '1', offset: 0}),
      style({transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2}),
      style({transform: 'translate3d(0, -20px, 0)', opacity: '1', offset: 0.4}),
      style({transform: 'translate3d(0, -20px, 0)', opacity: '1', offset: 0.45}),
      style({transform: 'translate3d(0, 2000px, 0)', opacity: '0', offset: 1})
    ],
    INUP: [
      style({transform: 'translate3d(0, 3000px, 0)', opacity: '0', offset: 0}),
      style({transform: 'translate3d(0, -25px, 0)', opacity: '1', offset: 0.6}),
      style({transform: 'translate3d(0, 100px, 0)', offset: 0.75}),
      style({transform: 'translate3d(0, -5px, 0)', offset: 0.9}),
      style({transform: 'translate3d(0, 0, 0)', opacity: '1', offset: 1})
    ],
    OUTUP: [
      style({transform: 'none', opacity: '1', offset: 0}),
      style({transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2}),
      style({transform: 'translate3d(0, 20px, 0)', opacity: '1', offset: 0.4}),
      style({transform: 'translate3d(0, 20px, 0)', opacity: '1', offset: 0.45}),
      style({transform: 'translate3d(0, -2000px, 0)', opacity: '0', offset: 1})
    ],
    INLEFT: [
      style({transform: 'translate3d(-3000px, 0, 0)', opacity: '0', offset: 0}),
      style({transform: 'translate3d(25px, 0, 0)', opacity: '1', offset: 0.6}),
      style({transform: 'translate3d(-100px, 0, 0)', offset: 0.75}),
      style({transform: 'translate3d(5px, 0, 0)', offset: 0.9}),
      style({transform: 'none', opacity: '1', offset: 1})
    ],
    OUTLEFT: [
      style({transform: 'none', opacity: '1', offset: 0}),
      style({transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2}),
      style({transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.4}),
      style({transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.45}),
      style({transform: 'translate3d(-2000px, 0, 0)', opacity: '0', offset: 1})
    ],
    INRIGHT: [
      style({transform: 'translate3d(3000px, 0, 0)', opacity: '0', offset: 0}),
      style({transform: 'translate3d(-25px, 0, 0)', opacity: '1', offset: 0.6}),
      style({ transform: 'translate3d(100px, 0, 0)', offset: 0.75}),
      style({transform: 'translate3d(-5px, 0, 0)', offset: 0.9}),
      style({transform: 'none', opacity: '1', offset: 1})
    ],
    OUTRIGHT: [
      style({transform: 'none', opacity: '1', offset: 0}),
      style({transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2}),
      style({transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.4}),
      style({transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.45}),
      style({transform: 'translate3d(2000px, 0, 0)', opacity: '0', offset: 1})
    ]
  },
  FLIP: {
    INX: [
      style({transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', offset: 0}),
      style({transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', offset: 0.4}),
      style({transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)', opacity: '1', offset: 0.6}),
      style({transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)', opacity: '1',offset: 0.8}),
      style({transform: 'perspective(400px)', opacity: '1', offset: 1})
    ],
    OUTX: [
      style({transform: 'perspective(400px)', opacity: '1', offset: 0}),
      style({transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', opacity: '1', offset: 0.3}),
      style({transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', offset: 1})
    ],
    INY: [
      style({transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', offset: 0}),
      style({transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', offset: 0.4}),
      style({transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)', opacity: '1', offset: 0.6}),
      style({transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)', opacity: '1',offset: 0.8}),
      style({transform: 'perspective(400px)', opacity: '1', offset: 1})
    ],
    OUTY: [
      style({transform: 'perspective(400px)', opacity: '1', offset: 0}),
      style({transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', opacity: '1', offset: 0.3}),
      style({transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', offset: 1})
    ]
  },
  FLASH: [
    style({opacity: '1', offset: 0}),
    style({opacity: '0', offset: 0.25}),
    style({opacity: '1', offset: 0.5}),
    style({opacity: '0', offset: 0.75}),
    style({opacity: '1', offset: 1})
  ],
  PULSE: [
    style({transform: 'scale3d(1, 1, 1)', offset: 0}),
    style({transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5}),
    style({transform: 'scale3d(1, 1, 1)', offset: 1})
  ],
  RUBBERBAND: [
    style({transform: 'scale3d(1, 1, 1)', offset: 0}),
    style({transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3}),
    style({transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4}),
    style({transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5}),
    style({transform: 'scale3d(.95, 1.05, 1)', offset: 0.65}),
    style({transform: 'scale3d(1.05, .95, 1)', offset: 0.75}),
    style({transform: 'scale3d(1, 1, 1)', offset: 1})
  ],
  LIGHT: {
    SPEEDINRIGHT: [
      style({transform: 'translate3d(100%, 0, 0) skewX(-30deg)', opacity: '0', offset: 0}),
      style({transform: 'skewX(20deg)', opacity: '1', offset: 0.6}),
      style({transform: 'skewX(-5deg)', opacity: '1', offset: 0.8}),
      style({transform: 'none', opacity: '1 ', offset: 1})
    ],
    SPEEDOUTRIGHT: [
      style({transform: 'none', opacity: '1 ', offset: 0}),
      style({transform: 'translate3d(100%, 0, 0) skewX(30deg)', opacity: '0', offset: 1})
    ],
    SPEEDINLEFT: [
      style({transform: 'translate3d(-100%, 0, 0) skewX(-30deg)', opacity: '0', offset: 0}),
      style({transform: 'skewX(20deg)', opacity: '1', offset: 0.6}),
      style({transform: 'skewX(-5deg)', opacity: '1', offset: 0.8}),
      style({transform: 'none', opacity: '1 ', offset: 1})
    ],
    SPEEDOUTLEFT: [
      style({transform: 'none', opacity: '1 ', offset: 0}),
      style({transform: 'translate3d(-100%, 0, 0) skewX(30deg)', opacity: '0', offset: 1})
    ]
  },
  SHAKE: [
    style({transform: 'translate3d(-10px, 0, 0)', offset: 0.1}),
    style({transform: 'translate3d(10px, 0, 0)', offset: 0.2}),
    style({transform: 'translate3d(-10px, 0, 0)', offset: 0.3}),
    style({transform: 'translate3d(10px, 0, 0)', offset: 0.4}),
    style({transform: 'translate3d(-10px, 0, 0)', offset: 0.5}),
    style({transform: 'translate3d(10px, 0, 0)', offset: 0.6}),
    style({transform: 'translate3d(-10px, 0, 0)', offset: 0.7}),
    style({transform: 'translate3d(10px, 0, 0)', offset: 0.8}),
    style({transform: 'translate3d(-10px, 0, 0)', offset: 0.9}),
    style({transform: 'translate3d(0, 0, 0)', offset: 1})
  ],
  SWING: [
    style({transform: 'translate(0%)', offset: 0}),
    style({transform: 'rotate3d(0, 0, 1, 15deg)', offset: 0.2}),
    style({transform: 'rotate3d(0, 0, 1, -10deg)', offset: 0.4}),
    style({transform: 'rotate3d(0, 0, 1, 5deg)', offset: 0.6}),
    style({transform: 'rotate3d(0, 0, 1, -5deg)', offset: 0.8}),
    style({transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1})
  ],
  TADA: [
    style({transform: 'scale3d(1, 1, 1)', offset: 0}),
    style({transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.1}),
    style({transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.2}),
    style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.3}),
    style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.4}),
    style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.5}),
    style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.6}),
    style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.7}),
    style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.8}),
    style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.9}),
    style({transform: 'scale3d(1, 1, 1)', offset: 1})
  ],
  WOBBLE: [
    style({transform: 'translate(0%)', offset: 0}),
    style({transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)', offset: 0.15}),
    style({transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)', offset: 0.45}),
    style({transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)', offset: 0.6}),
    style({transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)', offset: 0.75}),
    style({transform: 'translateX(0%)', offset: 1})
  ],
  FADE: {
    IN: [
      style({opacity: '0', offset: 0}),
      style({opacity: '1', offset: 1})
    ],
    OUT: [
      style({opacity: '1', offset: 0}),
      style({opacity: '0', offset: 1})
    ]
  }
};

@Injectable()
export class Animator {
  static bounceIn(time: number = 1000): AnimationEntryMetadata {
    return trigger('bounceIn', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.IN)))
    ]);
  }
}

/* tslint:disable */
/*export const ANIME = {
  BOUNCE: function bounce(time: number = 1000, enter: boolean = true, leave: boolean = true): AnimationEntryMetadata {
    let effects = [];

    if (enter) {
      effects.push(transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.ENTER))));
    }

    if (leave) {
      effects.push(transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.LEAVE))));
    }

    return trigger('bounce', effects);
  },
  BOUNCEIN: function boundeIn(time: number = 1000): AnimationEntryMetadata {
    return trigger('bounceIn', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.IN)))
    ]);
  },
  BOUNCEOUT: function bounceOut(time: number = 1000): AnimationEntryMetadata {
    return trigger('bounceOut', [
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUT)))
    ]);
  },
  BOUNCEINOUT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInOut', [
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.IN))),
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.OUT)))
    ]);
  },
  BOUNCEINDOWN: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInDown', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INDOWN)))
    ]);
  },
  BOUNCEOUTDOWN: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceOutDown', [
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTDOWN)))
    ]);
  },
  BOUNCEINOUTDOWN: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInOutDown', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INDOWN))),
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTDOWN)))
    ]);
  },
  BOUNCEINUP: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInUp', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INUP)))
    ]);
  },
  BOUNCEOUTUP: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceOutUp', [
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTUP)))
    ]);
  },
  BOUNCEINOUTUP: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInOutUp', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INUP))),
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTUP)))
    ]);
  },
  BOUNCEINLEFT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInLeft', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INLEFT)))
    ]);
  },
  BOUNCEOUTLEFT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceOutLeft', [
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTLEFT)))
    ]);
  },
  BOUNCEINOUTLEFT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInOutLeft', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INLEFT))),
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTLEFT)))
    ]);
  },
  BOUNCEINRIGHT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInRight', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INRIGHT)))
    ]);
  },
  BOUNCEOUTRIGHT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceOutRight', [
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTRIGHT)))
    ]);
  },
  BOUNCEINOUTRIGHT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('bounceInOutRight', [
      transition('void => *', animate(time, keyframes(EFFECTS.BOUNCE.INRIGHT))),
      transition('* => void', animate(time, keyframes(EFFECTS.BOUNCE.OUTRIGHT)))
    ]);
  },
  FLIP: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flip', [
      transition('void => *', animate(time, keyframes([
        style({transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)', offset: 0}),
        style({transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)', offset: 0.4}),
        style({transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)', offset: 0.5}),
        style({transform: 'perspective(400px) scale3d(.95, .95, .95)', offset: 0.8}),
        style({transform: 'perspective(400px)', offset: 1})
      ])))
    ]);
  },
  FLIPINX: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flipInX', [
      transition('void => *', animate(time, keyframes(EFFECTS.FLIP.INX)))
    ]);
  },
  FLIPOUTX: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flipOutX', [
      transition('* => void', animate(time, keyframes(EFFECTS.FLIP.OUTX)))
    ]);
  },
  FLIPINOUTX: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flipInX', [
      transition('void => *', animate(time, keyframes(EFFECTS.FLIP.INX))),
      transition('* => void', animate(time, keyframes(EFFECTS.FLIP.OUTX)))
    ]);
  },
  FLIPINY: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flipInY', [
      transition('void => *', animate(time, keyframes(EFFECTS.FLIP.INY)))
    ]);
  },
  FLIPOUTY: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flipOutY', [
      transition('* => void', animate(time, keyframes(EFFECTS.FLIP.OUTY)))
    ]);
  },
  FLIPINOUTY: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flipInOutY', [
      transition('void => *', animate(time, keyframes(EFFECTS.FLIP.INY))),
      transition('* => void', animate(time, keyframes(EFFECTS.FLIP.OUTY)))
    ]);
  },
  FLASH: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('flash', [
      transition('void => *', animate(time, keyframes(EFFECTS.FLASH)))
    ]);
  },
  PULSE: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('pulse', [
      transition('void => *', animate(time, keyframes(EFFECTS.PULSE)))
    ]);
  },
  RUBBERBAND: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('rubberBand', [
      transition('void => *', animate(time, keyframes(EFFECTS.RUBBERBAND)))
    ]);
  },
  LIGHTSPEEDINRIGHT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('lightSpeedInRight', [
      transition('void => *', animate(time, keyframes(EFFECTS.LIGHT.SPEEDINRIGHT)))
    ]);
  },
  LIGHTSPEEDOUTRIGHT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('lightSpeedOutRight', [
      transition('* => void', animate(time, keyframes(EFFECTS.LIGHT.SPEEDOUTRIGHT)))
    ]);
  },
  LIGHTSPEEDINOUTRIGHT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('lightSpeedInOutRight', [
      transition('void => *', animate(time, keyframes(EFFECTS.LIGHT.SPEEDINRIGHT))),
      transition('* => void', animate(time, keyframes(EFFECTS.LIGHT.SPEEDOUTRIGHT)))
    ]);
  },
  LIGHTSPEEDINLEFT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('lightSpeedInLeft', [
      transition('void => *', animate(time, keyframes(EFFECTS.LIGHT.SPEEDINLEFT)))
    ]);
  },
  LIGHTSPEEDOUTLEFT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('lightSpeedOutLeft', [
      transition('* => void', animate(time, keyframes(EFFECTS.LIGHT.SPEEDOUTLEFT)))
    ]);
  },
  LIGHTSPEEDINOUTLEFT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('lightSpeedInOutLeft', [
      transition('void => *', animate(time, keyframes(EFFECTS.LIGHT.SPEEDINLEFT))),
      transition('* => void', animate(time, keyframes(EFFECTS.LIGHT.SPEEDOUTLEFT)))
    ]);
  },
  SHAKE: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('shake', [
      transition('void => *', animate(time, keyframes(EFFECTS.SHAKE)))
    ]);
  },
  SWING: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('swing', [
      transition('void => *', animate(time, keyframes(EFFECTS.SWING)))
    ]);
  },
  TADA: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('tada', [
      transition('void => *', animate(time, keyframes(EFFECTS.TADA)))
    ]);
  },
  WOBBLE: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('wobble', [
      transition('void => *', animate(time, keyframes(EFFECTS.WOBBLE)))
    ]);
  },
  FADEIN: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('fadeIn', [
      transition('void => *', animate(time, keyframes(EFFECTS.FADE.IN)))
    ]);
  },
  FADEOUT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('fadeOut', [
      transition('* => void', animate(time, keyframes(EFFECTS.FADE.OUT)))
    ]);
  },
  FADEINOUT: (time: number = 1000): AnimationEntryMetadata => {
    return trigger('fadeInOut', [
      transition('void => *', animate(time, keyframes(EFFECTS.FADE.IN))),
      transition('* => void', animate(time, keyframes(EFFECTS.FADE.OUT)))
    ]);
  },
};*/
/* tslint:enable */
