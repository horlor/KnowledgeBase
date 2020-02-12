import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IQuestion from './Question';
import QuestionView from './QuestionView';
import { Container } from '@material-ui/core';

const QuestionList : React.FC = () =>{
    const [state, setState] = useState<IQuestion[]>([]);
    const loadFromApi = () => {
        axios.get<IQuestion[]>("http://localhost:5001/api/questions"
        )
        .then(response => setState(response.data))
        .catch(ex => console.log(ex));
    }

    useEffect(loadFromApi);

    return (
        <Container maxWidth="lg">
            {state.map(q => <QuestionView title={q.title} content={q.content}/>)}
        </Container>
    );
}

export default QuestionList;