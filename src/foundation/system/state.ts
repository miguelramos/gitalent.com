import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { set, get, has, cloneDeep } from 'lodash';

export interface InternalState {
  [key: string]: any;
}

export type StoreType = {
  state: State,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

export interface UINavbarState {
  isVisible?: boolean;
  isStick?: boolean;
  isInverse?: boolean;
  hasScroll?: boolean;
  hasInfoBar?: boolean;
  head?: {
    enable?: boolean;
    hasMobile?: boolean;
    targetId?: string;
  };
  info?: {
    enable?: boolean;
  };
  menu?: {
    isLeft?: boolean;
    isRight?: boolean;
    enable?: boolean;
  };
  side?: {
    isRight?: boolean;
    isLeft?: boolean;
    enable?: boolean;
  };
  user?: {
    isRight?: boolean;
    isLeft?: boolean;
    enable?: boolean;
  };
}

export interface UIFooterState {
  enable?: UINavbarState;
}

export interface UIState {
  NAVBAR?: UINavbarState;
  FOOTER?: UIFooterState;
}

export interface State {
  UI?: UIState;
}

@Injectable()
export class State {
  internalState: InternalState = {};
  private internalSubject: Subject<State>;

  constructor() {
    this.internalState = {};

    this.internalSubject = new Subject();
  }

  // already return a clone of the current state
  get state() {
    return this.internalState = this._clone(this.internalState);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    return get(this.state, prop, this.state);
  }

  set(prop: string, value: any) {
    let _state = set<State>(this.internalState, prop, value);

    this.internalSubject.next(_state);

    return _state;
  }

  has(prop?: string): boolean {
    return has(this.internalState, prop);
  }

  observe(): Observable<State> {
    return this.internalSubject.asObservable();
  }

  private _clone(object: InternalState) {
    return cloneDeep(object);
  }
}
