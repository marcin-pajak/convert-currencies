import reducer, { SET_ERROR, setUiError, getError } from './index';
import { FETCH_RATES } from '../rates';
import { getState } from '../common/testHelpers';

const error = 'Some error';
const expectedAction = {
  type: SET_ERROR,
  payload: error
};

describe('UI', () => {
  test('should create SET_CURRENCIES action', () => {
    expect(setUiError(error)).toEqual(expectedAction);
  });

  test('should return default state', () => {
    const state = getState({ ui: reducer(undefined, {}) });
    expect(state.ui).toEqual({ hasError: false });
  });

  test('should handle SET_ERROR and return if there is an error', () => {
    const state = getState({ ui: reducer(undefined, expectedAction) });
    expect(state.ui).toEqual({ hasError: true });
    expect(getError(state)).toEqual(true);
  });

  test('should reset error', () => {
    const stateBefore = getState({ ui: { hasError: true } });
    const stateAfter = getState({
      ui: reducer(stateBefore.ui, { type: FETCH_RATES })
    });
    expect(getError(stateAfter)).toEqual(false);
  });
});
