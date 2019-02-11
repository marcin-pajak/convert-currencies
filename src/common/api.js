const getLocal = (endpoint, attrs) =>
  `http://localhost:8090/${endpoint}?${attrs}`;

const getProd = (endpoint, attrs) =>
  `http://data.fixer.io/api/${endpoint}?access_key=${
    process.env.REACT_APP_API_KEY
  }&${attrs}`;

export const callGet = (endpoint, attrs) =>
  process.env.NODE_ENV === 'production'
    ? getProd(endpoint, attrs)
    : getLocal(endpoint, attrs);
