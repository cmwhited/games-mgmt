import React from 'react';
import ReactDOM from 'react-dom';
import { navigate } from '@reach/router';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, Theme, CssBaseline } from '@material-ui/core';
import { blueGrey, deepOrange, red } from '@material-ui/core/colors';

import AuthProvider from './Auth/Auth';
import App from './App/App';
import { config } from './config';
import * as serviceWorker from './serviceWorker';

const theme: Theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepOrange,
    error: {
      light: red[700],
      main: red[900],
      dark: red[900]
    }
  },
  typography: {
    fontFamily: ['Inconsolata', 'sans-serif'].join(','),
    fontSize: 16
  }
});

const opts: Auth0ClientOptions = config.opts;

/**
 * this grabs the url the user was trying to route to when the request was initiated.
 * This way, if the user is trying to nav to a locekd routed, after they have authenticated,
 * this will return them to route they were trying to reach.
 */
const onSuccessRedirect = (appState: any) => {
  navigate(appState.targetUrl);
};

ReactDOM.render(
  <AuthProvider onSuccessRedirect={onSuccessRedirect} opts={opts}>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
