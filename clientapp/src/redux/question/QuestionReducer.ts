import { createReducer, createAction } from "@reduxjs/toolkit";
import Question from "../../models/Question";
import QuestionWithAnswers from "../../models/QuestionWithAnswers";
import Answer from "../../models/Answer";

export interface IQuestionStore{
    questions: Question[],
    questionwithanswers? : QuestionWithAnswers,
    loading: boolean
}

const initialState : IQuestionStore = {
    questions : [],
    questionwithanswers : undefined,
    loading : false
}

export const AddQuestionAction = createAction<Question>("add-question");
export const AddAnswerAction = createAction<Answer>("add-answer");
export const LoadQuestionsAction = createAction<Question[]>("load-questions");
export const StartQuestionsLoadingAction = createAction("set-loading");

export const QuestionReducer = createReducer(initialState, builder => builder
    .addCase(AddAnswerAction, (state, action)=>{
        state.questionwithanswers?.answers.concat(action.payload);
    })
    .addCase(AddQuestionAction, (state, action)=>{
        state.questions.push(action.payload);
    })
    .addCase(LoadQuestionsAction, (state, action)=>{
        state.questions = action.payload;
        state.loading = false;
    })
    .addCase(StartQuestionsLoadingAction, (state, action)=>{
        state.loading = true;
    })
);

export default QuestionReducer;