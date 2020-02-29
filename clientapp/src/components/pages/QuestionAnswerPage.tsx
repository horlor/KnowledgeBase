import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import QuestionView from '../question/QuestionView';
import AnswerView from '../answer/AnswerView';
import AnswerInput from '../answer/AnswerInput';
import { RouteComponentProps } from 'react-router';
import QuestionWithAnswers from '../../models/QuestionWithAnswers';
import Axios from 'axios';

type IProps = RouteComponentProps<{
    id: string;
}>;


const QuestionAnswerPage :  React.FC<IProps> = (props) =>{
    const [question, setQuestion] = useState<QuestionWithAnswers>();
    const [prevId, setPrevId] = useState<number>(0);
    useEffect( () =>{
        let id = parseInt(props.match.params.id);
        //if the id had not changed, the we don't have to fetch the data once more
        if(id!==prevId && !isNaN(id)){
            setPrevId(id);
            Axios.get<QuestionWithAnswers>(`/api/questions/${id}`)
            .then(resp => setQuestion(resp.data));
            console.log("api fetch run")
        }
    },[prevId,props.match.params.id]);

    
    return (
        <Container maxWidth="lg">
            {question?
            <>
                <QuestionView question={question}/>
                {question.answers.map(ans => <AnswerView content={ans.content} key={ans.id}/>) }
                <AnswerInput questionId={question.id}/>
            </>:
            <Typography>Loading</Typography>}
        </Container>
    );
}

export default QuestionAnswerPage;