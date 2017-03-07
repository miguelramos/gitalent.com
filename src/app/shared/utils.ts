import { ActionReducer, combineReducers, Action } from '@ngrx/store';

const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

function deepCombineReducers<R>(reducers: any): ActionReducer<R> {

  Object.getOwnPropertyNames(reducers).forEach((prop) => {
    if (reducers.hasOwnProperty(prop)
      && reducers[prop] !== null
      && typeof reducers[prop] !== 'function') {
      reducers[prop] = deepCombineReducers(reducers[prop]);
    }
  });

  return combineReducers(reducers);
}

export function createReducer<T>(asyncReducers = {}): ActionReducer<T> {
  return deepCombineReducers<T>(Object.assign({
    // TODO: Declare common where
    // any other reducers you always want to be available
  }, asyncReducers));
}

/**
 * This function builds a state reducer to replace the typical switch/case pattern,
 * given an initial state and a list of classes with static type and reduce function.
 * @param initial The initial state for this reducer, called by store to initialize the state
 * @param actionClasses a list of classes (type names) implementing the required static reducer interface.
 */
export function buildReducer<T>(initial: T, ...actionClasses: { type: string, reduce: (state: T, action: Action) => T }[]) {
    let handlers: {
        [key: string]: (state: T, action: Action) => T
    } = {};
    actionClasses.forEach((ac) => {
        handlers[ac.type] = ac.reduce;
    });
    return (state: T = initial, action: Action) => handlers[action.type] ? handlers[action.type](state, action) : state;
}
