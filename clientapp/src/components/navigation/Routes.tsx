import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import QuestionsPage from '../pages/QuestionsPage';
import NewQuestionPage from '../pages/NewQuestionPage';
import QuestionAnswerPage from '../pages/QuestionAnswerPage';
import  LoginPage  from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NavigationView from './NavigationView';
import WelcomePage from '../pages/WelcomePage';
import UserPage from '../pages/UserPage';


interface IProps{

}

export const Routes : React.FC<IProps> = (props) => {
    
    return (
        <BrowserRouter>
            <NavigationView>
            <Route 
                path="/questions"
                component={QuestionsPage}
                exact={true}    
            />
            <Route 
                path="/newquestion"
                component={NewQuestionPage}
                exact={true}
            />
            <Route 
                path="/questions/:id"
                component={QuestionAnswerPage}
                exact={true}
            />
            <Route
                path="/login"
                component={LoginPage}
                exact={true}
            />
            <Route
                path="/register"
                component={RegisterPage}
                exact
            />
            <Route
                path="/"
                component={WelcomePage}
                exact
            />
            <Route
                path="/users"
                component={UserPage}
                exact
            />
            </NavigationView>
        </BrowserRouter>
    );
};

export default Routes;