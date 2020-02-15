import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IQuestion from './Question';
import QuestionView from './QuestionView';
import { Container } from '@material-ui/core';
import AnswerInput from './AnswerInput';

interface IProps{

}

interface IState{
    questions: IQuestion[];
}


class QuestionList extends React.Component<IProps, IState>{
    public componentDidMount(){
        axios.get<IQuestion[]>("http://localhost:5001/api/questions")
        .then(response => this.setState({questions: response.data}));
    }
    constructor(props: IProps){
        super(props);
        this.state = {questions: []};
    }

    public render(){
        return (
            <Container maxWidth="lg" >
                {
                    this.state.questions.map(q => <QuestionView title={q.title} content={q.content}/>)
                }
                <AnswerInput/>
            </Container>
        );
    }
}

export default QuestionList;