import { ActionsObservable } from 'redux-observable';
import { of, throwError } from 'rxjs';
import reducer, {
  FETCH_RATES,
  fetchRates,
  SET_RATES,
  setRates,
  getRate,
  getLatestTimestamp,
  fetchCurrentRatesEpic
} from './index';
import { SET_ERROR } from '../ui';

const rates = {
  success: true,
  base: 'EUR',
  date: '2019-02-09',
  timestamp: 1549735146,
  rates: {
    AED: 4.163757,
    AFN: 85.640091
  }
};
const meta = { kind: 'latest' };
const setRatesAction = {
  type: SET_RATES,
  payload: rates,
  meta: { kind: 'latest' }
};

const transformedRates = {
  EUR: {
    dates: { '2019-02-09': { AED: 4.163757, AFN: 85.640091 } },
    latest: '2019-02-09',
    timestamp: 1549735146
  }
};

describe('Rates', () => {
  test('should create FETCH_RATES action', () => {
    const payload = 'EUR';
    const expectedAction = {
      type: FETCH_RATES,
      payload: {
        currency: payload
      }
    };
    expect(fetchRates(payload)).toEqual(expectedAction);
  });

  test('should create SET_RATES action', () => {
    expect(setRates(rates, meta)).toEqual(setRatesAction);
  });

  test('should return default state', () => {
    const state = { rates: reducer(undefined, {}) };
    expect(state.rates).toEqual({});
  });

  test('should handle SET_RATES', () => {
    const state = { rates: reducer(undefined, setRatesAction) };
    expect(state.rates).toEqual(transformedRates);
  });

  test('should return proper rate', () => {
    const state = { rates: transformedRates, user: { baseCurrency: 'EUR' } };
    expect(getRate(state, 'AED')).toEqual(rates.rates.AED);
  });

  test('should return timestamp of last fetched conversion rate', () => {
    const state = { rates: transformedRates, user: { baseCurrency: 'EUR' } };
    expect(getLatestTimestamp(state)).toEqual(rates.timestamp);
  });

  test('should fetch rates', done => {
    const getJSON = () => of(rates);
    const action$ = ActionsObservable.of({
      type: FETCH_RATES,
      payload: {
        currency: 'EUR'
      }
    });
    return fetchCurrentRatesEpic(action$, null, { getJSON }).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toEqual(setRatesAction);
        done();
      }
    );
  });

  test('should set error when cannot fetch rates', done => {
    const getJSON = () => throwError('Couldnt load');
    const action$ = ActionsObservable.of({
      type: FETCH_RATES,
      payload: {
        currency: 'EUR'
      }
    });
    const expectedAction = { type: SET_ERROR, error: 'Couldnt load' };
    return fetchCurrentRatesEpic(action$, null, { getJSON }).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedAction);
        done();
      }
    );
  });
});
