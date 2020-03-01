import React from 'react';
import QuestionCard from '../question/QuestionCard';
import {Container} from '@material-ui/core';
import {  useQuestionsState } from '../../redux/question/QuestionHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';

interface IProps{

}

const QuestionsPage : React.FC<IProps> = (props) => {
    const {questions, error, loading} = useQuestionsState();

    if(loading)
        return <LoadingView/>;
    if(error)
        return <ErrorView title={error.title} message={error.message}/>;
    return(
        <Container maxWidth="xl">
        {
        questions? questions.map(q => <QuestionCard question={q}  key={q.id}/>) : <p>Loading</p>
        }
        </Container>
    );
}


export default QuestionsPage;