import { Component, Input, style, animate, transition, trigger } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'waiting',
  templateUrl: 'waiting.html',
  styleUrls: ['waiting.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(400, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WaitingComponent {
  @Input()
  set visibility(visible: boolean) {
    this._visibility = visible;
  }
  get visibility() {
    return this._visibility;
  }
  @Input()
  set color(color: string) {
    this._color = color;
  }
  get color() {
    return this._color;
  }

  private _visibility = false;
  private _color = 'warn';
}
