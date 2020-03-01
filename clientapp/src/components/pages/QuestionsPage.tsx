import React, { useEffect } from 'react';
import Question from '../../models/Question';
import QuestionCard from '../question/QuestionCard';
import {Container, Typography, Button} from '@material-ui/core';
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useQuestions, useQuestionsLoading } from '../../redux/question/QuestionHooks';
import Axios from 'axios';
import { LoadQuestionsAction } from '../../redux/question/QuestionReducer';

interface IProps{

}

const QuestionsPage : React.FC<IProps> = (props) => {
    const questions = useQuestions();
    useQuestionsLoading();
    /*const dispatch = useDispatch();
    useEffect(()=>{
        axios.get<Question[]>("/api/questions")
        .then(resp => dispatch(LoadQuestionsAction(resp.data)));
    }, []);*/

    return(
        <Container>
        {questions? questions.map(q => <QuestionCard question={q}  key={q.id}/>) : <p>Loading</p>
            
        }
        </Container>
    );
}


export default QuestionsPage;