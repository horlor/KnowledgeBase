import React, { useState } from 'react';
import './App.css';
import NavigationView from './navigation/NavigationView';
import QuestionView from './question/QuestionView';
import { Container, CssBaseline, makeStyles, Drawer, Button } from '@material-ui/core';
import QuestionList from './question/QuestionList';


const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <NavigationView/>
      </header>
      <QuestionList/>
    </>
    
  );
}

export default App;
