import {useSelector, useDispatch, shallowEqual} from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { LoadQuestionsFromApi, LoadQuestionAnswerFromApi } from "../api/QuestionApi";
import { useEffect } from "react";
import { FetchQuestionsStarted, FetchQuestionsSuccess, FetchQuestionsFailure, FetchQAStarted, FetchQASuccess, FetchQAFailure } from "../redux/question/QuestionReducer";
import ErrorModel from "../models/ErrorModel";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";
import { AxiosError } from "axios";

///Selector hooks to use int the components without depending them directly on redux
export const useSelectQuestions = () =>
    useSelector((state : RootState) => state.question.questions);

export const useSelectQuestionWithAnswer = () =>
    useSelector((state : RootState) => state.question.questionwithanswers)

export const useSelectLoading = () =>
    useSelector((state : RootState) => state.question.loading);



export const useQuestionsHook = () =>{
    var questions = useSelector((state : RootState) => state.question.questions);
    var error = useSelector((state: RootState) => state.question.error);
    var loading = useSelector((state: RootState) => state.question.loading);
    var currentPage = useSelector((state: RootState) => state.question.currentPage);
    var pageCount = useSelector((state: RootState) => state.question.pages);
    var dispatch = useDispatch();
    useEffect(()=>{
        dispatch(FetchQuestionsStarted());
        LoadQuestionsFromApi()
        .then(resp => dispatch(FetchQuestionsSuccess(resp)))
        .catch(ex => dispatch(FetchQuestionsFailure(CatchIntoErrorModel(ex))))
    },[dispatch]); //It won't change just to make React happy
    return {questions, error, loading, currentPage, pageCount};
}


export const useQuestionAnswerHook = (questionId: number) => {
    const dispatch = useDispatch();
    const question = useSelector((state: RootState) => state.question.questionwithanswers,shallowEqual,);
    const error = useSelector((state: RootState) => state.question.error);
    const loading = useSelector((state: RootState) => state.question.loading);
    useEffect(()=>{
        dispatch(FetchQAStarted());
        LoadQuestionAnswerFromApi(questionId)
        .then(resp => dispatch(FetchQASuccess(resp)))
        .catch(ex => dispatch(FetchQAFailure(CatchIntoErrorModel(ex))));
    },[dispatch,questionId]);
    return {question,loading, error};

}
