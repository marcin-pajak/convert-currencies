import React from 'react';
import ReactDom from 'react-dom';
import CalculatorTo from './CalculatorTo';

test('should render fine', () => {
  const div = document.createElement('div');
  ReactDom.render(
    <CalculatorTo
      currency={'PLN'}
      currencies={[{ value: 'PLN', label: 'Polish zloty' }]}
    />,
    div
  );
  expect(div.querySelector('h2').textContent).toBe('To PLN');
  ReactDom.unmountComponentAtNode(div);
});
