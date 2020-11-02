import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import {useTheme} from "./hooks/ThemeHooks";
import Axios from 'axios';
import Routes from './components/navigation/Routes';
import {Provider} from "react-redux"
import {AppStore} from './redux/Store';
import AuthService from './api/AuthService';
import ThemeProvider from './components/common/ThemeProvider';

Axios.defaults.headers.common["Access-Control-Allow-Origin"]="*";
Axios.defaults.baseURL="http://localhost:5001/";
//To ensure the login before the app Start
//TODO something better
AuthService.LoginFromStorage();




const App = () => {
  return (
      <Provider store={AppStore}>
        <ThemeProvider>
          <CssBaseline/>
          <Routes/>
        </ThemeProvider>
      </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
