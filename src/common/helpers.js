export const convertAmount = (amount, rate) => {
  const amountTo = (amount * rate).toFixed(2);
  return isNaN(amountTo) ? "Couldn't calculate" : amountTo;
};

export const toDateFromTimestamp = timestamp =>
  new Date(timestamp * 1000).toDateString();

export const checkResponse = response => {
  if (response && !response.success) {
    throw new Error('Unsuccessful call');
  }
  return response;
};
