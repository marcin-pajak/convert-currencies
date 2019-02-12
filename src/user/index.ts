import { createAction, ActionType } from 'typesafe-actions';
import { RootState, UserState } from '../types';
/**
 * User Duck
 */

// Types
export const SET_BASE_CURRENCY: string = 'SET_BASE_CURRENCY';
export const DEFAULT_CURRENCY: string = 'EUR';

// Action Creators
export const setBaseCurrency = createAction(
  SET_BASE_CURRENCY,
  resolve => (currency: string) => resolve(currency)
);

// Selectors
export const getBaseCurency = (state: RootState): string =>
  state.user.baseCurrency;

// Reducer
export const userStateDefault: UserState = {
  baseCurrency: DEFAULT_CURRENCY
};
export const user = (
  state: UserState = userStateDefault,
  action: ActionType<typeof setBaseCurrency>
): UserState => {
  if (action.type === SET_BASE_CURRENCY) {
    return {
      ...state,
      baseCurrency: action.payload
    };
  }
  return state;
};

export default user;
