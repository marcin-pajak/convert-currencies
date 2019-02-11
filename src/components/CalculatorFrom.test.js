import React from 'react';
import ReactDom from 'react-dom';
import CalculatorFrom from './CalculatorFrom';

test('should render fine', () => {
  const div = document.createElement('div');
  ReactDom.render(
    <CalculatorFrom
      currency={'EUR'}
      currencies={[{ value: 'EUR', label: 'Euro' }]}
    />,
    div
  );
  expect(div.querySelector('h2').textContent).toBe('From EUR');
  ReactDom.unmountComponentAtNode(div);
});
