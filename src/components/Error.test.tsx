import React from 'react';
import ReactDom from 'react-dom';
import Error from './Error';

test('Error should render fine', () => {
  const div = document.createElement('div');
  ReactDom.render(<Error>Some error</Error>, div);
  expect(div.querySelector('p').textContent).toBe('Some error');
  ReactDom.unmountComponentAtNode(div);
});
