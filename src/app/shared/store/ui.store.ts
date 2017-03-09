import { Action } from '@ngrx/store';

import { type, buildReducer } from '../support/utils';

export class UINavBarModel {
  enable: boolean;
}

export class UIPageModel {
  visible: boolean;
}

export interface UIState {
  navbar: UINavBarModel;
  page: UIPageModel;
}

const INITIAL_STATE = {
  navbar: { enable: true },
  page: { visible: false }
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

export class UIPageAction implements Action {

  static type = type('[UI] Page');
  type = UIPageAction.type;

  static reduce(state: UIState, action: UIPageAction) {
      return Object.assign(state, {
          page: action.payload
      });
  }

  constructor(public payload: UIPageModel) { }
}

export const UIReducer = buildReducer(
  INITIAL_STATE,
  UINavBarAction,
  UIPageAction
);
