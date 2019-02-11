import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createStore from './createStore';
import './index.css';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#f57c00', dark: '#bb4d00' },
    secondary: { main: '#ff6f00', dark: '#c43e00' }
  }
});

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
