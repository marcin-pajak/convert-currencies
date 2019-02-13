import React from 'react';
import ReactDom from 'react-dom';
import Converter from './presenter';

const props = {
  hasError: false,
  date: '10 Oct 2018',
  baseCurrency: 'EUR',
  targetCurrency: 'PLN',
  currenciesFrom: [{ value: 'EUR', label: 'Euro' }],
  currenciesTo: [{ value: 'EUR', label: 'Euro' }],
  timestamp: 1549735121,
  points: [],
  rate: 1,
  fetchRates: () => {},
  fetchCurrencies: () => {},
  setBaseCurrency: () => {},
  setTargetCurrency: () => {}
};

describe('Currency component', () => {
  test('should render fine', () => {
    const div = document.createElement('div');
    ReactDom.render(<Converter {...props} />, div);
    expect(div.querySelector('h1').textContent).toBe('Currency Converter');
    ReactDom.unmountComponentAtNode(div);
  });

  test('should render loader', () => {
    const div = document.createElement('div');
    ReactDom.render(<Converter {...props} currenciesFrom={[]} />, div);
    expect(div.querySelector('[role="progressbar"]')).not.toBe(null);
    ReactDom.unmountComponentAtNode(div);
  });

  test('should render error', () => {
    const div = document.createElement('div');
    ReactDom.render(<Converter {...props} hasError={true} />, div);
    expect(div.querySelector('.Error-text').textContent).toBe(
      "Couldn't load this currency, please try another one."
    );
    ReactDom.unmountComponentAtNode(div);
  });
});
