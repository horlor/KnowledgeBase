import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, makeStyles } from '@material-ui/core';
import QuestionView from './QuestionView';
import AnswerView from './AnswerView';
import AnswerInput from './AnswerInput';
import { RouteComponentProps } from 'react-router';
import QuestionWithAnswers from './QuestionWithAnswers';
import Axios from 'axios';

type IProps = RouteComponentProps<{
    id: string;
}>;


const QuestionAnswerPage :  React.FC<IProps> = (props) =>{
    const [question, setQuestion] = useState<QuestionWithAnswers>();
    const [prevId, setPrevId] = useState<number>(0);
    useEffect( () =>{
        let id = parseInt(props.match.params.id);
        if(id!==prevId){
            setPrevId(id);
            Axios.get<QuestionWithAnswers>(`/api/questions/${id}`)
            .then(resp => setQuestion(resp.data));
            console.log("api fetch run")
        }
    },[prevId]);

    
    return (
        <Container maxWidth="lg">
            {question?
            <>
                <QuestionView title={question.title} content={question.content}/>
                {question.answers.map(ans => <AnswerView content={ans.content} key={ans.id}/>) }
                <AnswerInput/>
            </>:
            <Typography>Loading</Typography>}
        </Container>
    );
}

export default QuestionAnswerPage;