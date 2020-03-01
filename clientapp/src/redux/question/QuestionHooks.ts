import {useSelector, useDispatch} from "react-redux";
import { RootState, AppDispatch } from "../Store";
import { StartQuestionsLoadingAction, LoadQuestionsAction } from "./QuestionReducer";
import { LoadQuestionsFromApi } from "../../api/QuestionApi";
import { useEffect } from "react";

///Selector hooks to use int the components without depending them directly on redux
export const useQuestions = () =>
    useSelector((state : RootState) => state.question.questions);

export const useQuestionWithAnswer = () =>
    useSelector((state : RootState) => state.question.questionwithanswers)



//Thunk action functions
export const useQuestionsLoading = () =>{
    var dispatch = useDispatch();
    dispatch(StartQuestionsLoadingAction());
    useEffect(()=>{
        LoadQuestionsFromApi()
        .then(resp => dispatch(LoadQuestionsAction(resp)))
        .catch(error => console.log(error));
    },[]);
}

export const LoadQuestions = async (dispatch : AppDispatch) =>{
    dispatch(StartQuestionsLoadingAction());
    var questions = await LoadQuestionsFromApi();
    var q
}