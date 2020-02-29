import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import QuestionsPage from '../pages/QuestionsPage';
import NewQuestionPage from '../pages/NewQuestionPage';
import QuestionAnswerPage from '../pages/QuestionAnswerPage';


interface IProps{

}

export const Routes : React.FC<IProps> = (props) => {
    
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
};

export default Routes;