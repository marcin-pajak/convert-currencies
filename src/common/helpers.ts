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
