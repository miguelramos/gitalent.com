import {
  Component, AfterViewInit, OnDestroy,
  ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';

import { State, Configurator, Animator, Prototype } from '../../../foundation';

@Component({
  moduleId: module.id,
  selector: 'home-page',
  templateUrl: './home.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ Animator.bounceIn(1000) ]
})
@Prototype({
  properties: {
    one: false,
    cool: null
  }
})
export class HomeContainer implements AfterViewInit, OnDestroy {
  toggle: boolean = false;
  slidesModel: any[];

  constructor(
    private state: State,
    private configurator: Configurator,
    private detectionStrategy: ChangeDetectorRef
  ) {
    this.slidesModel = [
      {
        image: '/assets/img/slide-01.svg',
        title: 'Heelo',
        info: 'Nice to have',
      },
      {
        image: '/assets/img/slide-02.svg',
        title: '<h1>World</h1>',
        info: '<p>Come on!</p>',
      },
      {
        image: '/assets/img/slide-01.svg',
        title: 'Cool',
        info: 'Nice to have',
      },
      {
        image: '/assets/img/slide-02.svg',
        title: '<h1>Awesome</h1>',
        info: '<p>Come on!</p>',
      }
    ];
    console.log(this);
  }

  onSelect() {
    this.toggle = (this.toggle) === false ? true : false;
    this.detectionStrategy.markForCheck();
  }

  ngAfterViewInit() {
    this.toggle = true;
    this.detectionStrategy.markForCheck();
  }

  ngOnDestroy() {}

}
