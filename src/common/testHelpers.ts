import { RootState } from '../types';
import { userStateDefault } from '../user';
import { uiDefaultState } from '../ui';

const defaultSatte: RootState = {
  currencies: {},
  rates: {},
  ui: uiDefaultState,
  user: userStateDefault
};

export const getState = (partial: any) => ({
  ...defaultSatte,
  ...partial
});
