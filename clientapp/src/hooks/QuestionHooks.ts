import {useSelector, useDispatch, shallowEqual} from "react-redux";
import { RootState } from "../redux/Store";
import { LoadQuestionAnswerFromApi, CreateQuestionToApi, DeleteQuestion, DeleteAnswer, UpdateQuestion, SearchQuestionsFromApi, ReopenQuestion, CloseQuestion } from "../api/QuestionApi";
import { useEffect, useState } from "react";
import { FetchQuestionsStarted, FetchQuestionsSuccess, FetchQuestionsFailure, FetchQAStarted, FetchQASuccess, FetchQAFailure, DeleteQuestionAction, DeleteAnswerAction, UpdateQuestionAction } from "../redux/reducers/QuestionReducer";
import ErrorModel from "../models/ErrorModel";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";
import { Topic } from "../models/Topic";
import { LoadTopicsThunk } from "../redux/reducers/TopicThunks";
import Question, { QuestionUpdateRequest, QuestionSearchResult } from "../models/Question";
import Answer from "../models/Answer";
import { LoadQuestionAnswersThunk } from "../redux/reducers/QuestionThunks";
import { useHistory } from "react-router";


export const useSearchQuestionsHook = (anywhere: string | null, title: string | null, content: string | null, topic: number | null, page: number) =>{
    var result = useSelector((state : RootState) => state.question.result, shallowEqual);
    var error = useSelector((state: RootState) => state.question.error);
    var loading = useSelector((state: RootState) => state.question.loading);
    var username = useSelector((state: RootState) => state.login.username)
    var dispatch = useDispatch();

    useEffect(()=>{
        (async()=>{
            dispatch(FetchQuestionsStarted())
            try{
                let res = await SearchQuestionsFromApi({anywhere: anywhere, title: title, content: content, topic:topic, page: page})
                console.log(res);
                dispatch(FetchQuestionsSuccess(res))
            }
            catch(exc){
                console.log(exc)
                dispatch(FetchQuestionsFailure(CatchIntoErrorModel(exc)))
            }
        })();
    },[anywhere, title, content, topic, page, dispatch])

    const deleteQuestion = (q: Question)=>{
        DeleteQuestion(q);
        dispatch(DeleteQuestionAction(q));
    }

    return {result, error, loading, username, deleteQuestion};

}



export const useQuestionAnswerHook = (questionId: number) => {
    const dispatch = useDispatch();
    const question = useSelector((state: RootState) => state.question.questionwithanswers,shallowEqual);
    const error = useSelector((state: RootState) => state.question.error);
    const loading = useSelector((state: RootState) => state.question.loading);
    const username = useSelector((state: RootState) => state.login.username);
    const [selected, setSelected] = useState<Answer>();

    const deleteAnswerWithDialog = (answer: Answer) => {
        if(username !== answer.author)
            return undefined;
        return ()=>{
            setSelected(answer);
        }
    }

    const acceptDeleteAnswer = ()=>{
        if(selected && question){
            DeleteAnswer(question.id,selected);
            dispatch(DeleteAnswerAction(selected));
        }
            
        setSelected(undefined);
    }

    const cancelDeleteAnswer = ()=>{
        setSelected(undefined)
    }

    useEffect(()=>{
        dispatch(FetchQAStarted());
        LoadQuestionAnswerFromApi(questionId)
        .then(resp => dispatch(FetchQASuccess(resp)))
        .catch(ex => dispatch(FetchQAFailure(CatchIntoErrorModel(ex))));
    },[dispatch,questionId]);
    return {question,loading, error, selected, deleteAnswerWithDialog, acceptDeleteAnswer, cancelDeleteAnswer};

}


export const useNewQuestionHook = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
    const username = useSelector((state : RootState) => state.login.username);
    const topics = useSelector((state: RootState) => state.topic.topics)
    const [postError, setPostError] = useState<ErrorModel |undefined>(undefined);
    const [postLoading, setPostLoading] = useState(false);
    const history = useHistory();

    useEffect(() =>{
        dispatch(LoadTopicsThunk());
    },[dispatch])

    const post = async (title: string, content: string, topic: Topic) => {
        const q : Question = {
            title: title,
            content: content,
            topic: topic,
            author: username?username:'',
            id:0,
            closed:false,
        }
        try{
            const result = await CreateQuestionToApi(q);
            history.push("/questions/"+result.id);
        }
        catch(exc){
            setPostError(CatchIntoErrorModel(exc));
        }
    }

    return {topics,  loggedIn, post, postLoading, postError};
}

export const useQuestionEditHook = (question: Question) =>{
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.login.username);
    const [edit, setEdit] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const modifyEnabled = question.author === user;
    const modified = question.created !== question.lastUpdate;

    const saveChanges =  async(request: QuestionUpdateRequest) =>{
        try{
            let result = await UpdateQuestion(question.id, request);
            dispatch(UpdateQuestionAction(result));
        }
        catch(exc){
            console.log("Update failed") 
        }
        setEdit(false)
    }
    const dropChanges = () =>{
        setEdit(false)
    }
    const editQuestion = () =>{
        setEdit(true)
    }

    const closeQuestion = async (content: string) =>{
        if(user){
            if(question.closed)
                await ReopenQuestion(question.id, {id:0, content:content, author: user})
            else
                await CloseQuestion(question.id, {id:0, content:content, author: user})
            dispatch(LoadQuestionAnswersThunk(question.id))
        }
        setDialogOpen(false);
    }

    const openDialog = ()=>{
        setDialogOpen(true);
    }

    const closeDialog =()=>{
        setDialogOpen(false);
    }

    return { modifyEnabled, edit, saveChanges, dropChanges, editQuestion, modified, closeState:{openDialog, closeDialog, closeQuestion, dialogOpen}};
}
