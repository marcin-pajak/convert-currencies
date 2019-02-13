import reducer, {
  DEFAULT_CURRENCY,
  DEFAULT_TARGET_CURRENCY,
  SET_BASE_CURRENCY,
  setBaseCurrency,
  getBaseCurency
} from './index';
import { RootState, UserState } from '../types';
import { getState } from '../common/testHelpers';

const getInitialState = (initial?: Partial<RootState>) =>
  reducer(initial as UserState, {} as any);

describe('User', () => {
  test('should create SET_BASE_CURRENCY action', () => {
    const expectedAction = {
      type: SET_BASE_CURRENCY,
      payload: DEFAULT_CURRENCY
    };
    expect(setBaseCurrency(DEFAULT_CURRENCY)).toEqual(expectedAction);
  });

  test('should return default state', () => {
    const state = { user: getInitialState() };
    expect(state.user).toEqual({
      baseCurrency: DEFAULT_CURRENCY,
      targetCurrency: DEFAULT_TARGET_CURRENCY
    });
  });

  test('should handle SET_BASE_CURRENCY and return proper currency', () => {
    const state = getState({
      user: reducer(undefined, {
        type: SET_BASE_CURRENCY,
        payload: 'PLN'
      })
    });
    expect(state.user).toEqual({
      baseCurrency: 'PLN',
      targetCurrency: DEFAULT_TARGET_CURRENCY
    });
    expect(getBaseCurency(state)).toEqual('PLN');
  });
});
