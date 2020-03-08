import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import QuestionView from '../question/QuestionView';
import AnswerView from '../answer/AnswerView';
import AnswerInput from '../answer/AnswerInput';
import { RouteComponentProps } from 'react-router';
import QuestionWithAnswers from '../../models/QuestionWithAnswers';
import Axios from 'axios';
import { useQuestionAnswerHook } from '../../hooks/QuestionHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';
import ErrorModel from '../../models/ErrorModel'

type IProps = RouteComponentProps<{
    id: string;
}>;


const QuestionAnswerPage :  React.FC<IProps> = (props) =>{
    //fetch the id from the path
    let id = parseInt(props.match.params.id);
    //a custom hook to handle logic separetaly
    const {question, loading, error} = useQuestionAnswerHook(id);

    if(loading)
        return <LoadingView/>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>
    return (
        <Container maxWidth="lg">
            {question?
            <>
                <QuestionView question={question}/>
                {question.answers.map(ans => <AnswerView content={ans.content} key={ans.id} author={ans.author}/>) }
                <AnswerInput questionId={question.id}/>
            </>:
            <Typography>Loading</Typography>}
        </Container>
    );
}

export default QuestionAnswerPage;