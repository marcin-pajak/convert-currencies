import { createSelector } from 'reselect';
import { REFERENCE_CURRENCY, getBaseCurency, getTargetCurrency } from '../user';
import { getRandom } from '../common/helpers';
import { substractDays } from '../common/dateHelpers';
import { RootState } from '../types';

export const getRates = (state: RootState, date?: string) => {
  const currencyState = state.rates[REFERENCE_CURRENCY];
  const currencyDates = currencyState && currencyState.dates;
  const latestIndex = currencyState && currencyState.latest;
  const dateIndex = date || latestIndex;
  return currencyDates && currencyDates[dateIndex];
};

/**
 * Get exganche rate from users currency to target currency
 */
export const getRateMemo = createSelector(
  getBaseCurency,
  getTargetCurrency,
  getRates,
  (base, target, rates) => {
    if (!rates) return 0;

    const currencyFromRate = rates[base];
    const currencyToRate = rates[target];
    const normalizeFrom = 1 / currencyFromRate;

    return normalizeFrom * currencyToRate;
  }
);

/**
 * Get timestamp of last fetched exchange rates
 */
export const getLatestTimestamp = (state: RootState): number | undefined => {
  const currencyState = state.rates[REFERENCE_CURRENCY];
  return currencyState && currencyState.timestamp;
};

export const getAllRates = (state: RootState) => state.rates;

export const getLatestDate = createSelector(
  getAllRates,
  rates => {
    const currencyState = rates[REFERENCE_CURRENCY];
    return currencyState && currencyState.latest;
  }
);

export const getLast30Rates = createSelector(
  getRateMemo,
  getLatestDate,
  (rate, latestDate) => {
    const transformed = Array.apply(0, Array(30)).reduce(
      (acc: any[], curr, index) => [
        ...acc,
        [substractDays(latestDate, index), rate + getRandom(1.5)]
      ],
      []
    );
    return (transformed as any[]).reverse();
  }
);
