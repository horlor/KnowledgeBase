import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/Store'
import Answer from '../models/Answer';
import { CreateAnswerToQuestion } from '../api/QuestionApi';
import { AddAnswerAction } from '../redux/reducers/QuestionReducer';

export const useAnswerInputHook = (id: number)=>{
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
    const user = useSelector((state: RootState) => state.login.username);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const postAnswer = async (content: string) => {
        if(user === undefined)
            return;
        setLoading(true);
        let answer : Answer = {id:0, author: user, content:content};
        CreateAnswerToQuestion(id, answer)
        .then(resp => {
            setLoading(false);
            dispatch(AddAnswerAction(resp));
        })
        .catch(exc=> setLoading(false));
    }

    return {loggedIn, user, error, loading, postAnswer}
}