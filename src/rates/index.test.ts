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
import { epicService } from '../createStore';
import { getState } from '../common/testHelpers';
import { RootState, RatesState, RatesResponse } from '../types';

const rates: RatesResponse = {
  success: true,
  base: 'EUR',
  date: '2019-02-09',
  timestamp: 1549735146,
  rates: {
    AED: 4.163757,
    AFN: 85.640091,
    EUR: 1
  }
};
const meta: { kind: 'latest' | 'historical' } = { kind: 'latest' };
const setRatesAction = {
  type: SET_RATES as typeof SET_RATES,
  payload: rates,
  meta: meta
};

const transformedRates = {
  EUR: {
    dates: { '2019-02-09': { AED: 4.163757, AFN: 85.640091, EUR: 1 } },
    latest: '2019-02-09',
    timestamp: 1549735146
  }
};

const getInitialState = (initial?: Partial<RootState>) =>
  reducer(initial as RatesState, {} as any);

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
    expect(setRates(rates, { kind: 'latest' })).toEqual(setRatesAction);
  });

  test('should return default state', () => {
    const state = getState({ rates: getInitialState() });
    expect(state.rates).toEqual({});
  });

  test('should handle SET_RATES', () => {
    const state = { rates: reducer(undefined, setRatesAction) };
    expect(state.rates).toEqual(transformedRates);
  });

  test('should return proper rate', () => {
    const state = getState({
      rates: transformedRates,
      user: { baseCurrency: 'EUR' }
    });
    expect(getRate(state, 'AED')).toEqual(rates.rates.AED);
  });

  test('should return timestamp of last fetched conversion rate', () => {
    const state = getState({
      rates: transformedRates,
      user: { baseCurrency: 'EUR' }
    });
    expect(getLatestTimestamp(state)).toEqual(rates.timestamp);
  });

  test('should fetch rates', done => {
    epicService.getJSON = jest.fn().mockImplementation(() => of(rates));
    const action$ = ActionsObservable.of({
      type: FETCH_RATES as typeof FETCH_RATES,
      payload: {
        currency: 'EUR'
      }
    });
    return fetchCurrentRatesEpic(action$, null, epicService).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toEqual(setRatesAction);
        done();
      }
    );
  });

  test('should set error when cannot fetch rates', done => {
    epicService.getJSON = jest
      .fn()
      .mockImplementation(() => throwError('Couldnt load'));
    const action$ = ActionsObservable.of({
      type: FETCH_RATES as typeof FETCH_RATES,
      payload: {
        currency: 'EUR'
      }
    });
    const expectedAction = { type: SET_ERROR, payload: 'Couldnt load' };
    return fetchCurrentRatesEpic(action$, null, epicService).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedAction);
        done();
      }
    );
  });
});
