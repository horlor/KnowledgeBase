import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NewQuestionPage from '../pages/NewQuestionPage';
import QuestionAnswerPage from '../pages/QuestionAnswerPage';
import  LoginPage  from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NavigationView from './NavigationView';
import WelcomePage from '../pages/WelcomePage';
import UserPage from '../pages/UserPage';
import Menu from './Menu';
import UserDetailPage from '../pages/UserDetailPage';
import { useLoginStateManager } from '../../hooks/LoginHooks';
import ProfilePage from '../pages/ProfilePage';
import NotificationPage from '../pages/NotificationPage';
import NotificationPanel from '../notification/NotificationPanel';
import AdminPage from '../pages/AdminPage';
import TopicPage from '../pages/TopicPage';
import SearchQuestionsPage from '../pages/SearchQuestionsPage';
import MyQuestionsPage from '../pages/MyQuestionsPage';
import PasswordRecoveryPage from '../pages/PasswordRecoveryPage';
import PasswordResetPage from '../pages/ResetPasswordPage';


interface IProps{

}

export const Routes : React.FC<IProps> = (props) => {
    useLoginStateManager();
    return (
        <BrowserRouter>
            <NavigationView drawer={<Menu/>}>
            <Route 
                path="/questions"
                component={SearchQuestionsPage}
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
                path="/users/:username"
                component={UserDetailPage}
                
            />
            <Route
                path="/users"
                component={UserPage}
                exact
            />
            <Route
                path="/profile"
                component={ProfilePage}
                exact
            />
            <Route
                path="/notifications"
                component={NotificationPage}
                exact
            />
            <Route
                path="/admin"
                component={AdminPage}
            />
            <Route
                path="/topics"
                component={TopicPage}
            />
            <Route
                path="/search_questions"
                component={SearchQuestionsPage}
            />
            <Route
                path="/my_questions"
                component={MyQuestionsPage}
            />
            <Route
                path="/password_recovery"
                component={PasswordRecoveryPage}
            />
            <Route
                path="/password_reset"
                component={PasswordResetPage}
            />
            </NavigationView>
        {<NotificationPanel/>}
        </BrowserRouter>
    );
};

export default Routes;