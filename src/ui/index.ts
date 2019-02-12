import { createAction, ActionType } from 'typesafe-actions';
import { fetchRates, FETCH_RATES } from '../rates';
import { RootState, UIState } from '../types';

/**
 * UI Duck
 */

// Types
export const SET_ERROR: string = 'app/ui/SET_ERROR';

// Action Creators
export const setUiError = createAction(SET_ERROR, resolve => (error: string) =>
  resolve(error)
);

const actions = {
  fetchRates,
  setUiError
};

type Actions = ActionType<typeof actions>;

/**
 * Selectors
 */
export const getError = (state: RootState): boolean => state.ui.hasError;

/**
 * Reducers
 */
export const uiDefaultState: UIState = { hasError: false };
export const ui = (
  state: UIState = uiDefaultState,
  action: Actions
): UIState => {
  switch (action.type) {
    case FETCH_RATES:
      return {
        ...state,
        hasError: false
      };
    case SET_ERROR:
      return {
        ...state,
        hasError: true
      };
    default:
      return state;
  }
};

export default ui;
