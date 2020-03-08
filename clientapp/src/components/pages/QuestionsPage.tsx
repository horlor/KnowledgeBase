import React from 'react';
import QuestionCard from '../question/QuestionCard';
import {Container} from '@material-ui/core';
import {  useQuestionsHook } from '../../hooks/QuestionHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';

interface IProps{

}

const QuestionsPage : React.FC<IProps> = (props) => {
    const {questions, error, loading} = useQuestionsHook();
    if(loading)
        return <LoadingView/>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>;
    return(
        <Container maxWidth="xl">
        {
        questions.map(q => <QuestionCard question={q}  key={q.id}/>)
        }
        </Container>
    );
}


export default QuestionsPage;