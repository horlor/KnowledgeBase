import React, { useEffect, useState } from 'react';
import { Container, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import QuestionView from '../question/QuestionView';
import AnswerView from '../answer/AnswerView';
import AnswerInput from '../answer/AnswerInput';
import { RouteComponentProps } from 'react-router';
import { useQuestionAnswerHook } from '../../hooks/QuestionHooks';
import LoadingView from '../common/LoadingView';
import ErrorPage from '../common/ErrorPage';

type IProps = RouteComponentProps<{
    id: string;
}>;


const QuestionAnswerPage :  React.FC<IProps> = (props) =>{
    //fetch the id from the path
    let id = parseInt(props.match.params.id);
    //a custom hook to handle logic separetaly
    const {question, loading, error, selected, deleteAnswerWithDialog, acceptDeleteAnswer, cancelDeleteAnswer} = useQuestionAnswerHook(id);
    if(loading)
        return <LoadingView/>;
    if(error)
        return <ErrorPage title={error.title} message={error.description}/>
    return (
        <Container maxWidth="lg">
            {question?
            <>
                <QuestionView question={question}/>
                {question.answers.map(ans => {
                    return <AnswerView  key={ans.id} answer={ans}/>;
                }
                    ) }
                    {question.closed?"":<AnswerInput questionId={question.id}/>}
                
                <Dialog open={!!selected}>
                    <DialogTitle>Warning!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{`Are you sure to delete the following answer: ${selected?.content.slice(0,50)}...?`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={acceptDeleteAnswer}>Ok</Button>
                        <Button onClick={cancelDeleteAnswer}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </>:
            <Typography>Loading</Typography>}
        </Container>
    );
}

export default QuestionAnswerPage;