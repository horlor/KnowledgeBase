import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationView from './navigation/NavigationView';
import QuestionView from './question/QuestionView';
import { Container, CssBaseline, makeStyles, Drawer, Button } from '@material-ui/core';
import QuestionList from './question/QuestionList';
import QuestionAnswerPage from './question/QuestionAnswerPage';
import QuestionsPage from './question/QuestionsPage';
import Axios from 'axios';

Axios.defaults.baseURL="http://localhost:5001/";


const App = () => {
  /*
  const worker = ()=>{
    for(let i=0; i<1000000000000; i++);
    console.log("huhuhu");
  };
  useEffect(worker);*/
  return (
    <>
      <CssBaseline/>
      <header>
        <NavigationView>
          <QuestionsPage></QuestionsPage>
        </NavigationView>
      </header>
      
    </>
    
  );
}

export default App;
