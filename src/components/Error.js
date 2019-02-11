import React from 'react';
import './Error.css';

const Error = props => (
  <div className="Error">
    <p className="Error-text">{props.children}</p>
  </div>
);

export default Error;
