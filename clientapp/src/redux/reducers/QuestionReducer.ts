import { createReducer, createAction } from "@reduxjs/toolkit";
import Question, { PagedQuestions, QuestionWithAnswers } from "../../models/Question";
import Answer from "../../models/Answer";
import ErrorModel from "../../models/ErrorModel";

export interface IQuestionStore{
    questions: Question[],
    currentPage: number,
    pages: number,
    questionwithanswers? : QuestionWithAnswers,
    loading: boolean,
    error?: ErrorModel
}

const initialState : IQuestionStore = {
    questions : [],
    currentPage: 1,
    pages: 0,
    questionwithanswers : undefined,
    loading : false
}

export const AddQuestionAction = createAction<Question>("add-question");
export const AddAnswerAction = createAction<Answer>("add-answer");
export const DeleteQuestionAction = createAction<Question>("delete-question");
export const FetchQuestionsStarted = createAction("fetch-questions-started");
export const FetchQuestionsSuccess = createAction<PagedQuestions>("fetch-questions-success");
export const FetchQuestionsFailure = createAction<ErrorModel>("fetch-questions-failure");
export const FetchQAStarted = createAction("fetch-questionanswer-started");
export const FetchQASuccess = createAction<QuestionWithAnswers>("fetch-questionanswer-success");
export const FetchQAFailure = createAction<ErrorModel>("fetch-questionanswer-failed");


export const QuestionReducer = createReducer(initialState, builder => builder
    .addCase(AddAnswerAction, (state, action)=>{
        state.questionwithanswers?.answers.push(action.payload);
    })
    .addCase(AddQuestionAction, (state, action)=>{
        state.questions.push(action.payload);
    })
    .addCase(FetchQuestionsStarted, (state, action) =>{
        state.loading = true;
        state.questions = [];
        state.error = undefined;
    })
    .addCase(FetchQuestionsSuccess, (state, action)=>{
        state.loading = false;
        state.questions = action.payload.questions;
        state.currentPage = action.payload.currentPage;
        state.pages = action.payload.pages;
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
        state.questions = state.questions.filter(q => q.id !== action.payload.id);
    })

);

export default QuestionReducer;