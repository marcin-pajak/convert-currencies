import { createAction } from 'typesafe-actions';
import { FETCH_RATES } from '../rates';
import { RootState, UIState } from '../types';

/**
 * UI Duck
 */

// Types
export const SET_ERROR: string = 'app/ui/SET_ERROR';

// Action Creators
// export const setUiError = (error: string) => ({
//   type: SET_ERROR,
//   error
// });

export const setUiError = createAction(SET_ERROR, resolve => (error: string) =>
  resolve(error)
);

/**
 * Selectors
 */
export const getError = (state: RootState): boolean => state.ui.hasError;

/**
 * Reducers
 */

export const ui = (
  state: UIState = { hasError: false },
  action: any
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
