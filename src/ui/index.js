import { FETCH_RATES } from '../rates';

/**
 * UI Duck
 */

// Types
export const SET_ERROR = 'app/ui/SET_ERROR';

// Action Creators
export const setUiError = error => ({
  type: SET_ERROR,
  error
});

/**
 * Selectors
 */
export const getError = state => state.ui.hasError;

/**
 * Reducers
 */
export const ui = (state = { hasError: false }, action) => {
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
