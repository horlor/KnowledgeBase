import { createReducer, createAction } from "@reduxjs/toolkit";
import Question from "../../models/Question";
import QuestionWithAnswers from "../../models/QuestionWithAnswers";
import Answer from "../../models/Answer";
import ErrorModel from "../../models/ErrorModel";

export interface IQuestionStore{
    questions: Question[],
    questionwithanswers? : QuestionWithAnswers,
    loading: boolean,
    error?: ErrorModel
}

const initialState : IQuestionStore = {
    questions : [],
    questionwithanswers : undefined,
    loading : false
}

export const AddQuestionAction = createAction<Question>("add-question");
export const AddAnswerAction = createAction<Answer>("add-answer");
export const FetchQuestionsStarted = createAction("fetch-questions-started");
export const FetchQuestionsSuccess = createAction<Question[]>("fetch-questions-success");
export const FetchQuestionsFailure = createAction<ErrorModel>("fetch-questions-failure");

export const QuestionReducer = createReducer(initialState, builder => builder
    .addCase(AddAnswerAction, (state, action)=>{
        state.questionwithanswers?.answers.concat(action.payload);
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
        state.questions = action.payload;
    })
    .addCase(FetchQuestionsFailure, (state, action) =>{
        state.error = action.payload;
        state.loading = false;
    })

);

export default QuestionReducer;