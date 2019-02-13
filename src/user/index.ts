import { createAction, ActionType } from 'typesafe-actions';
import { RootState, UserState } from '../types';
/**
 * User Duck
 */

// Types
export const SET_BASE_CURRENCY: string = 'SET_BASE_CURRENCY';
export const SET_TARGET_CURRENCY: string = 'SET_TARGET_CURRENCY';
export const REFERENCE_CURRENCY: string = 'EUR';
export const DEFAULT_CURRENCY: string = 'EUR';
export const DEFAULT_TARGET_CURRENCY: string = 'USD';

// Action Creators
export const setBaseCurrency = createAction(
  SET_BASE_CURRENCY,
  resolve => (currency: string) => resolve(currency)
);

export const setTargetCurrency = createAction(
  SET_TARGET_CURRENCY,
  resolve => (currency: string) => resolve(currency)
);

// Selectors
export const getBaseCurency = (state: RootState): string =>
  state.user.baseCurrency;

export const getTargetCurrency = (state: RootState): string =>
  state.user.targetCurrency;

// Reducer
export const userStateDefault: UserState = {
  baseCurrency: DEFAULT_CURRENCY,
  targetCurrency: DEFAULT_TARGET_CURRENCY
};
export const user = (
  state: UserState = userStateDefault,
  action: ActionType<typeof setBaseCurrency>
): UserState => {
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.payload
      };
    case SET_TARGET_CURRENCY:
      return {
        ...state,
        targetCurrency: action.payload
      };
    default:
      return state;
  }
};

export default user;
