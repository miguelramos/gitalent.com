import { createReducer, UIReducer, UIState } from './shared';

export interface ApplicationState {
  ui: UIState;
}

const productionReducer = createReducer<ApplicationState>({ui: UIReducer});

export function ApplicationReducer(state: any, action: any) {
    // TODO: add an environment switch here if an alternate for development is needed
    return productionReducer(state, action);
};
