import React, { FunctionComponent } from 'react';
import './Error.css';

export type ErrorProps = {
  children: string | React.ReactNode;
};

const Error: FunctionComponent<ErrorProps> = props => (
  <div className="Error">
    <p className="Error-text">{props.children}</p>
  </div>
);

export default Error;
