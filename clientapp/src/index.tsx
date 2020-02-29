import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import NavigationView from './components/navigation/NavigationView';
import { CssBaseline} from '@material-ui/core';
import Axios from 'axios';
import Routes from './components/navigation/Routes';
import {Provider} from "react-redux"
import createAppStore from './redux/Store';
Axios.defaults.baseURL="http://localhost:5001/";


const App = () => {
  const store = createAppStore();
  return (
      <Provider store={store}>
        <CssBaseline/>
        <NavigationView>
          <Routes/>
        </NavigationView>
      </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
