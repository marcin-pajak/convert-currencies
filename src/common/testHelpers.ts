import { RootState } from '../types';
import { userStateDefault } from '../user';

const defaultSatte: RootState = {
  currencies: {},
  rates: {},
  ui: {
    hasError: false
  },
  user: userStateDefault
};

export const getState = (partial: any) => ({
  ...defaultSatte,
  ...partial
});
