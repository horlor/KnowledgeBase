import React from 'react';
import './App.css';
import NavigationView from './navigation/NavigationView';
import { CssBaseline} from '@material-ui/core';
import Axios from 'axios';
import Routes from './navigation/Routes';

Axios.defaults.baseURL="http://localhost:5001/";


const App = () => {

  return (
    <>
      <CssBaseline/>
      <NavigationView>
        <Routes/>
      </NavigationView>
    </>
  );
}

export default App;
