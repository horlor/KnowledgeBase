import { createReducer, createAction } from "@reduxjs/toolkit";
import Question, { PagedQuestions, QuestionWithAnswers, QuestionSearchResult } from "../../models/Question";
import Answer from "../../models/Answer";
import ErrorModel from "../../models/ErrorModel";

export interface IQuestionStore{
    result?: QuestionSearchResult,
    questionwithanswers? : QuestionWithAnswers,
    loading: boolean,
    error?: ErrorModel
}

const initialState : IQuestionStore = {
    result : undefined,
    questionwithanswers : undefined,
    loading : false
}

export const UpdateQuestionAction = createAction<Question>("update-question");
export const DeleteQuestionAction = createAction<Question>("delete-question");

export const AddAnswerAction = createAction<Answer>("add-answer");
export const UpdateAnswerAction = createAction<Answer>("update-answer");
export const DeleteAnswerAction = createAction<Answer>("delete-answer")
export const FetchQuestionsStarted = createAction("fetch-questions-started");
export const FetchQuestionsSuccess = createAction<QuestionSearchResult>("fetch-questions-success");
export const FetchQuestionsFailure = createAction<ErrorModel>("fetch-questions-failure");
export const FetchQAStarted = createAction("fetch-questionanswer-started");
export const FetchQASuccess = createAction<QuestionWithAnswers>("fetch-questionanswer-success");
export const FetchQAFailure = createAction<ErrorModel>("fetch-questionanswer-failed");


export const QuestionReducer = createReducer(initialState, builder => builder
    .addCase(AddAnswerAction, (state, action)=>{
        state.questionwithanswers?.answers.push(action.payload);
    })
    .addCase(FetchQuestionsStarted, (state, action) =>{
        state.loading = true;
        state.result = undefined;
        state.error = undefined;
    })
    .addCase(FetchQuestionsSuccess, (state, action)=>{
        state.loading = false;
        state.result = action.payload

    })
    .addCase(FetchQuestionsFailure, (state, action) =>{
        state.error = action.payload;
        state.loading = false;
    })
    .addCase(FetchQAStarted, (state, action) =>{
        state.loading = true;
        state.questionwithanswers = undefined;
        state.error = undefined;
    })
    .addCase(FetchQASuccess, (state, action)=>{
        state.loading = false;
        state.questionwithanswers = action.payload;
    })
    .addCase(FetchQAFailure, (state, action) =>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(DeleteQuestionAction, (state, action) =>{
        if(state.result)
            state.result.questions = state.result.questions.filter(q => q.id !== action.payload.id);
    })
    .addCase(DeleteAnswerAction, (state, action) => {
        if(state.questionwithanswers)
            state.questionwithanswers.answers = state.questionwithanswers.answers.filter(ans => ans.id !== action.payload.id);
    })
    .addCase(UpdateAnswerAction, (state: IQuestionStore, action) =>{
        if(state.questionwithanswers){
            const idx  = state.questionwithanswers.answers.findIndex(a => a.id === action.payload.id);
            state.questionwithanswers.answers[idx] = action.payload;
        }
    })
    .addCase(UpdateQuestionAction, (state, action) =>{
        if(state.questionwithanswers){
            state.questionwithanswers = {...state.questionwithanswers, ...action.payload}
        }
    }) 

);

export default QuestionReducer;