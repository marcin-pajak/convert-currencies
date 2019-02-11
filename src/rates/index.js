import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { DEFAULT_CURRENCY, getBaseCurency } from '../user';
import { setUiError } from '../ui';
import { callGet } from '../common/api';
import { checkResponse } from '../common/helpers';

/**
 * Rates Duck
 */

// Types
export const FETCH_RATES = 'FETCH_RATES';
export const SET_RATES = 'SET_RATES';

// Action Creators
export const fetchRates = (currency = DEFAULT_CURRENCY) => ({
  type: FETCH_RATES,
  payload: {
    currency
  }
});

export const setRates = (payload, meta) => ({
  type: SET_RATES,
  payload,
  meta
});

// Epics
export const fetchCurrentRatesEpic = (action$, state, { getJSON }) =>
  action$.pipe(
    ofType(FETCH_RATES),
    mergeMap(action =>
      getJSON(callGet('latest', `base=${action.payload.currency}`)).pipe(
        map(response => checkResponse(response)),
        map(response => setRates(response, { kind: 'latest' })),
        catchError(error => of(setUiError(error)))
      )
    )
  );

export const ratesEpics = [fetchCurrentRatesEpic];

// Reducer
export const rates = (state = {}, action) => {
  if (action.type === SET_RATES) {
    const { date, base, timestamp, rates } = action.payload;
    const previous = state[base] || {};
    return {
      ...state,
      [base]: {
        ...previous,
        latest: action.meta.kind === 'latest' ? date : previous.latest,
        timestamp,
        dates: {
          ...previous.dates,
          [date]: rates
        }
      }
    };
  }
  return state;
};

// Selectors
/**
 * Get exganche rate from users currency to passed @currencyTo currency
 */
export const getRate = (state, currencyTo) => {
  const base = getBaseCurency(state);
  const currencyState = state.rates[base];
  const currencyDates = currencyState && currencyState.dates;
  return (
    currencyDates &&
    currencyDates[currencyState.latest] &&
    currencyDates[currencyState.latest][currencyTo]
  );
};

/**
 * Get timestamp of last fetched exchange rates
 */
export const getLatestTimestamp = state => {
  const base = getBaseCurency(state);
  const currencyState = state.rates[base];
  return currencyState && currencyState.timestamp;
};

export default rates;
