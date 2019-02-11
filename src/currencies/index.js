import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { setUiError } from '../ui';
import { callGet } from '../common/api';

/**
 * Currencies Duck
 */

// Types
export const FETCH_CURRIENCES = 'FETCH_CURRIENCES';
export const SET_CURRENCIES = 'SET_CURRENCIES';

// Action Creators
export const fetchCurrencies = () => ({
  type: FETCH_CURRIENCES
});

export const setCurrencies = currencies => ({
  type: SET_CURRENCIES,
  payload: currencies
});

// Epics
export const fetchCurrenciesEpic = (action$, state, { getJSON }) =>
  action$.pipe(
    ofType(FETCH_CURRIENCES),
    mergeMap(() =>
      getJSON(callGet('symbols')).pipe(
        map(response => setCurrencies(response && response.symbols)),
        catchError(error => of(setUiError(error)))
      )
    )
  );

export const currenciesEpics = [fetchCurrenciesEpic];

// Selectors
/**
 * Get all currencies except @currentCurrency if passed
 *
 */
export const getCurrenciesWithout = (state, currentCurrency) =>
  Object.keys(state.currencies)
    .filter(currency => currency !== currentCurrency)
    .map(currency => ({
      value: currency,
      label: state.currencies[currency]
    }));

// Reducers
export const currencies = (state = {}, action) => {
  if (action.type === SET_CURRENCIES) {
    return { ...state, ...action.payload };
  }
  return state;
};

export default currencies;
