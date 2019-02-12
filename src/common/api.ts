const getLocal = (endpoint: string, attrs?: string): string =>
  `http://localhost:8090/${endpoint}?${attrs}`;

const getProd = (endpoint: string, attrs?: string): string =>
  `http://data.fixer.io/api/${endpoint}?access_key=${
    process.env.REACT_APP_API_KEY
  }&${attrs}`;

export const callGet = (endpoint: string, attrs?: string): string =>
  process.env.NODE_ENV === 'production'
    ? getProd(endpoint, attrs)
    : getLocal(endpoint, attrs);
