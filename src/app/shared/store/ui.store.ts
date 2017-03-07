import { Action } from '@ngrx/store';

import { type, buildReducer } from '../utils';

export class UINavBarModel {
  enable: boolean;
}

export interface UIState {
  navbar: UINavBarModel;
}

const INITIAL_STATE = {
  navbar: { enable: true }
};

export class UINavBarAction implements Action {

  static type = type('[UI] Navbar');
  type = UINavBarAction.type;

  static reduce(state: UIState, action: UINavBarAction) {
      return Object.assign(state, {
          navbar: action.payload
      });
  }

  constructor(public payload: UINavBarModel) { }
}

export const UIReducer = buildReducer(INITIAL_STATE, UINavBarAction);
