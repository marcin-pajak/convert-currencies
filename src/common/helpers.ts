import { ResponseType } from '../types';

export const convertAmount = (amount: number, rate?: number): string => {
  if (!rate) {
    return "Couldn't calculate";
  }
  return (amount * rate).toFixed(2);
};

export const toDateFromTimestamp = (timestamp: number): string =>
  new Date(timestamp * 1000).toDateString();

export const checkResponse = (response: ResponseType): ResponseType | never => {
  if (response && !response.success) {
    throw new Error('Unsuccessful call');
  }
  return response;
};

const convert = (n: number): number => {
  const order = Math.floor(Math.log(n) / Math.LN10 + 0.000000001);
  return Math.pow(10, order);
};

export const getRandom = (numb: number): number => {
  const precision = convert(numb) * 10;
  return (
    Math.floor(
      Math.random() * (numb * precision - 1 * precision) + 1 * precision
    ) /
    (1 * precision)
  );
};
