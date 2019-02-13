import { createAction, ActionType, isActionOf } from 'typesafe-actions';
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { REFERENCE_CURRENCY, getBaseCurency } from '../user';
import { setUiError } from '../ui';
import { callGet } from '../common/api';
import { checkResponse } from '../common/helpers';
import {
  Currency,
  RootState,
  RatesState,
  RatesResponse,
  RootService
} from '../types';

/**
 * Rates Duck
 */

// Types
export const FETCH_RATES = 'FETCH_RATES';
export const SET_RATES = 'SET_RATES';

// Action Creators
export const fetchRates = createAction(
  FETCH_RATES,
  resolve => (currency: string = REFERENCE_CURRENCY) => resolve({ currency })
);

export const setRates = createAction(SET_RATES, resolve => {
  return (payload: RatesResponse, meta: { kind: 'latest' | 'historical' }) =>
    resolve(payload, meta);
});

export const ratesActions = {
  fetchRates,
  setRates,
  setUiError
};

export type RatesAction = ActionType<typeof ratesActions>;

// Epics
export const fetchCurrentRatesEpic: Epic<
  RatesAction,
  RatesAction,
  RootState,
  RootService
> = (action$, state, { getJSON }) =>
  action$.pipe(
    filter(isActionOf(fetchRates)),
    mergeMap((action: ActionType<typeof fetchRates>) =>
      getJSON(callGet('latest', `base=${action.payload.currency}`)).pipe(
        map((response: RatesResponse) => checkResponse(response)),
        map((response: RatesResponse) =>
          setRates(response, { kind: 'latest' })
        ),
        catchError(error => of(setUiError(error)))
      )
    )
  );

export const ratesEpics: Epic[] = [fetchCurrentRatesEpic];

// Reducer
export const rates = (
  state: RatesState = {},
  action: ActionType<typeof setRates>
) => {
  if (action.type === SET_RATES) {
    const { date, base, timestamp, rates } = action.payload;
    const previous = state[base] || ({} as Currency);
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
export const getRates = (state: RootState, date?: string) => {
  const currencyState = state.rates[REFERENCE_CURRENCY];
  const currencyDates = currencyState && currencyState.dates;
  const latestIndex = currencyState && currencyState.latest;
  const dateIndex = date || latestIndex;
  return currencyDates && currencyDates[dateIndex];
};

/**
 * Get exganche rate from users currency to passed @currencyTo currency
 */
export const getRate = (
  state: RootState,
  currencyTo: string,
  date?: string
): number => {
  const base = getBaseCurency(state);
  const rates = getRates(state, date);
  if (!rates) return 0;

  const currencyFromRate = rates[base];
  const currencyToRate = rates[currencyTo];
  const normalizeFrom = 1 / currencyFromRate;

  return normalizeFrom * currencyToRate;
};

/**
 * Get timestamp of last fetched exchange rates
 */
export const getLatestTimestamp = (state: RootState): number | undefined => {
  const base = getBaseCurency(state);
  const currencyState = state.rates[base];
  return currencyState && currencyState.timestamp;
};

export default rates;
