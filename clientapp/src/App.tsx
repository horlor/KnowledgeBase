import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationView from './navigation/NavigationView';
import QuestionView from './question/QuestionView';
import { Container, CssBaseline, makeStyles, Drawer, Button } from '@material-ui/core';
import QuestionList from './question/QuestionList';
import QuestionAnswerPage from './question/QuestionAnswerPage';
import QuestionsPage from './question/QuestionsPage';
import Axios from 'axios';
import NewQuestionPage from './question/NewQuestionPage';
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
