import { ActionsObservable } from 'redux-observable';
import { of, throwError } from 'rxjs';
import reducer, {
  FETCH_CURRIENCES,
  fetchCurrencies,
  SET_CURRENCIES,
  setCurrencies,
  getCurrenciesWithout,
  fetchCurrenciesEpic
} from './index';
import { SET_ERROR } from '../ui';

const payload = { EUR: 'Euro', PLN: 'Polish zloty' };
const setCurrenciesAction = {
  type: SET_CURRENCIES,
  payload
};

describe('Currencies', () => {
  test('should create FETCH_CURRIENCES action', () => {
    const expectedAction = {
      type: FETCH_CURRIENCES
    };
    expect(fetchCurrencies()).toEqual(expectedAction);
  });

  test('should create SET_CURRENCIES action', () => {
    expect(setCurrencies(payload)).toEqual(setCurrenciesAction);
  });

  test('should return default state', () => {
    const state = { currencies: reducer(undefined, {}) };
    expect(state.currencies).toEqual({});
  });

  test('should handle SET_CURRENCIES', () => {
    const state = { currencies: reducer(undefined, setCurrenciesAction) };
    expect(state.currencies).toEqual(payload);
  });

  test('should return proper currencies', () => {
    const state = { currencies: payload };
    const transformedCurrencies = [
      { value: 'EUR', label: 'Euro' },
      { value: 'PLN', label: 'Polish zloty' }
    ];
    expect(getCurrenciesWithout(state)).toEqual(transformedCurrencies);
    expect(getCurrenciesWithout(state, 'EUR')).toEqual([
      transformedCurrencies[1]
    ]);
  });

  test('should fetch currencies', done => {
    const getJSON = () => of({ symbols: payload });
    const action$ = ActionsObservable.of({
      type: FETCH_CURRIENCES
    });
    return fetchCurrenciesEpic(action$, null, { getJSON }).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toEqual(setCurrenciesAction);
        done();
      }
    );
  });

  test('should set error when cannot fetch currencies', done => {
    const getJSON = () => throwError('Couldnt load');
    const action$ = ActionsObservable.of({
      type: FETCH_CURRIENCES
    });
    const expectedAction = { type: SET_ERROR, error: 'Couldnt load' };
    return fetchCurrenciesEpic(action$, null, { getJSON }).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedAction);
        done();
      }
    );
  });
});
