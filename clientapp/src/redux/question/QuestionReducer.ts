import { createReducer } from "@reduxjs/toolkit";
import { IQuestionStore } from "./QuestionTypes";
import { AddAnswerAction, AddQuestionAction } from "./QuestionActions";

const initialState : IQuestionStore = {
    questions : [{id:1, title:"Questioreducer test", content:"react is fun", author:"random"}],
    questionwithanswers : undefined
}

export const QuestionReducer = createReducer(initialState, builder => builder
    .addCase(AddAnswerAction, (state, action)=>{
        state.questionwithanswers?.answers.concat(action.payload);
    })
    .addCase(AddQuestionAction, (state, action)=>{
        state.questions.push(action.payload);
    })
);

export default QuestionReducer;