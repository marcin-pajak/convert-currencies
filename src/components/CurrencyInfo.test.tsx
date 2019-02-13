import React from 'react';
import ReactDom from 'react-dom';
import CurrencyInfo from './CurrencyInfo';

const props = {
  date: '10 Oct 2018',
  baseCurrency: 'EUR',
  targetCurrency: 'PLN',
  rate: 4
};

describe('Currency component', () => {
  test('should render fine', () => {
    const div = document.createElement('div');
    ReactDom.render(<CurrencyInfo {...props} />, div);
    expect(div.querySelector('p').textContent).toBe('1 EUR equals 4 PLN');
    ReactDom.unmountComponentAtNode(div);
  });
});
