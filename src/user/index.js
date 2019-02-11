/**
 * User Duck
 */

// Types
export const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
export const DEFAULT_CURRENCY = 'EUR';

// Action Creators
export const setBaseCurrency = payload => ({
  type: SET_BASE_CURRENCY,
  payload
});

// Selectors
export const getBaseCurency = state => state.user.baseCurrency;

// Reducer
const userStateDefault = {
  baseCurrency: DEFAULT_CURRENCY
};
export const user = (state = userStateDefault, action) => {
  if (action.type === SET_BASE_CURRENCY) {
    return {
      ...state,
      baseCurrency: action.payload
    };
  }
  return state;
};

export default user;
