import reducer, { SET_ERROR, setUiError, getError } from './index';
import { FETCH_RATES } from '../rates';

const error = new Error('Some error');
const expectedAction = {
  type: SET_ERROR,
  error
};

describe('UI', () => {
  test('should create SET_CURRENCIES action', () => {
    expect(setUiError(error)).toEqual(expectedAction);
  });

  test('should return default state', () => {
    const state = { ui: reducer(undefined, {}) };
    expect(state.ui).toEqual({ hasError: false });
  });

  test('should handle SET_ERROR and return if there is an error', () => {
    const state = { ui: reducer(undefined, expectedAction) };
    expect(state.ui).toEqual({ hasError: true });
    expect(getError(state)).toEqual(true);
  });

  test('should reset error', () => {
    const stateBefore = { ui: { hasError: true } };
    const stateAfter = { ui: reducer(stateBefore.ui, { type: FETCH_RATES }) };
    expect(getError(stateAfter)).toEqual(false);
  });
});
