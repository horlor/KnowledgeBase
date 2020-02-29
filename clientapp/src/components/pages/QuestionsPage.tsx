import React from 'react';
import Question from '../../models/Question';
import QuestionCard from '../question/QuestionCard';
import {Container, Typography} from '@material-ui/core';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import {RootState} from '../../redux/Store'

interface IProps{

}

const QuestionsPage : React.FC<IProps> = (props) => {
    const questions = useSelector((state : RootState)=> state.questions);
    return(
        <Container>
        {questions?
            questions.map(q => <QuestionCard question={q}  key={q.id}/>):
            <Typography>Loading</Typography>
        }
        </Container>
    );
}


export default QuestionsPage;