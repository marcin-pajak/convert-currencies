import { epicService } from './createStore';

export type CurrencyOption = {
  value: string;
  label: string;
};

export type CurrencySymbol = {
  [currencySymbol: string]: string;
};

export type CurrenciesState = {
  readonly [currencyCode: string]: string;
};

export type CurrencyRates = {
  [index: string]: number;
};

export type CurrencyDateRates = {
  [index: string]: CurrencyRates;
};

export type Currency = {
  latest: string;
  timestamp: number;
  dates: CurrencyDateRates;
};

export type RatesState = {
  [index: string]: Currency;
};

export type UIState = {
  hasError: boolean;
};

export type UserState = {
  baseCurrency: string;
};

export type RootState = {
  readonly currencies: CurrenciesState;
  readonly rates: RatesState;
  readonly ui: UIState;
  readonly user: UserState;
};

export type ResponseType = {
  success: boolean;
};

export type RatesResponse = ResponseType & {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: CurrencyRates;
};

export type RootService = typeof epicService;
