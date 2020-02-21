import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import QuestionsPage from '../question/QuestionsPage';
import NewQuestionPage from '../question/NewQuestionPage';


interface IProps{

}
const Routes : React.FC<IProps> = (props) => {
    
    return (
        <BrowserRouter>
            <Route 
                path="/questions"
                component={QuestionsPage}
                exact={true}    
            />
            <Route 
                path="/questions/new"
                component={NewQuestionPage}
                exact={true}
            />
        </BrowserRouter>
    );
};

export default Routes;