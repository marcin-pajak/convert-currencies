import reducer, {
  DEFAULT_CURRENCY,
  SET_BASE_CURRENCY,
  setBaseCurrency,
  getBaseCurency
} from './index';

describe('User', () => {
  test('should create SET_BASE_CURRENCY action', () => {
    const expectedAction = {
      type: SET_BASE_CURRENCY,
      payload: DEFAULT_CURRENCY
    };
    expect(setBaseCurrency(DEFAULT_CURRENCY)).toEqual(expectedAction);
  });

  test('should return default state', () => {
    const state = { user: reducer(undefined, {}) };
    expect(state.user).toEqual({ baseCurrency: DEFAULT_CURRENCY });
  });

  test('should handle SET_BASE_CURRENCY and return proper currency', () => {
    const state = {
      user: reducer(undefined, {
        type: SET_BASE_CURRENCY,
        payload: 'PLN'
      })
    };
    expect(state.user).toEqual({ baseCurrency: 'PLN' });
    expect(getBaseCurency(state)).toEqual('PLN');
  });
});
