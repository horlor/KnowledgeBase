import { createAction } from "@reduxjs/toolkit";
import Question from "../../models/Question";
import { IAddAnswerPayload } from "./QuestionTypes";
import Answer from "../../models/Answer";

export const AddQuestionAction = createAction<Question>("add-question");
export const AddAnswerAction = createAction<Answer>("add-answer");
