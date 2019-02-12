import reducer, { SET_ERROR, setUiError, getError } from './index';
import { FETCH_RATES } from '../rates';
import { getState } from '../common/testHelpers';
import { RootState, UIState } from '../types';

const error = 'Some error';
const expectedAction = {
  type: SET_ERROR as typeof SET_ERROR,
  payload: error
};

const getInitialState = (initial?: Partial<RootState>) =>
  reducer(initial as UIState, {} as any);

describe('UI', () => {
  test('should create SET_CURRENCIES action', () => {
    expect(setUiError(error)).toEqual(expectedAction);
  });

  test('should return default state', () => {
    const state = getState({ ui: getInitialState() });
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
      ui: reducer(stateBefore.ui, {
        type: FETCH_RATES as typeof FETCH_RATES,
        payload: { currency: 'EUR' }
      })
    });
    expect(getError(stateAfter)).toEqual(false);
  });
});
