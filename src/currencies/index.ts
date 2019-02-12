import { createAction, ActionType, isActionOf } from 'typesafe-actions';
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { setUiError } from '../ui';
import { callGet } from '../common/api';
import {
  RootState,
  CurrenciesState,
  CurrencyOption,
  CurrencySymbol,
  ResponseType,
  RootService
} from '../types';

/**
 * Currencies Duck
 */

// Types
export const FETCH_CURRIENCES: string = 'FETCH_CURRIENCES';
export const SET_CURRENCIES: string = 'SET_CURRENCIES';

// Action Creators
export const fetchCurrencies = createAction(FETCH_CURRIENCES);

export const setCurrencies = createAction(
  SET_CURRENCIES,
  resolve => (currencies: CurrencySymbol) => resolve(currencies)
);

export const currenciesActions = {
  fetchCurrencies,
  setCurrencies,
  setUiError
};

export type CurenciesAction = ActionType<typeof currenciesActions>;

// Epics
type CurrenciesResponse = ResponseType & { symbols: CurrencySymbol };
export const fetchCurrenciesEpic: Epic<
  CurenciesAction,
  CurenciesAction,
  RootState,
  RootService
> = (action$, state, { getJSON }) =>
  action$.pipe(
    filter(isActionOf(fetchCurrencies)),
    mergeMap(() =>
      getJSON(callGet('symbols')).pipe(
        map((response: CurrenciesResponse) =>
          setCurrencies(response && response.symbols)
        ),
        catchError(error => of(setUiError(error)))
      )
    )
  );

export const currenciesEpics: Epic[] = [fetchCurrenciesEpic];

// Selectors
/**
 * Get all currencies except @currentCurrency if passed
 *
 */
export const getCurrenciesWithout = (
  state: RootState,
  currentCurrency?: string
): CurrencyOption[] =>
  Object.keys(state.currencies)
    .filter(currency => currency !== currentCurrency)
    .map(currency => ({
      value: currency,
      label: state.currencies[currency]
    }));

// Reducers
export const currencies = (
  state: CurrenciesState = {},
  action: ActionType<typeof setCurrencies>
): CurrenciesState => {
  if (action.type === SET_CURRENCIES) {
    return { ...state, ...action.payload };
  }
  return state;
};

export default currencies;
