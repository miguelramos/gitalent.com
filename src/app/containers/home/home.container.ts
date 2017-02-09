import {
  Component, AfterViewInit, OnDestroy,
  ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';

import { State, Configurator, Animator } from '../../../foundation';

@Component({
  moduleId: module.id,
  selector: 'home-page',
  templateUrl: './home.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ Animator.bounceIn(1000) ]
})
export class HomeContainer implements AfterViewInit, OnDestroy {
  toggle: boolean = false;

  constructor(
    private state: State,
    private configurator: Configurator,
    private detectionStrategy: ChangeDetectorRef
  ) {}

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
