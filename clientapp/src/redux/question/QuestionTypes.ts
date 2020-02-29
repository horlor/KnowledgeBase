import Question from "../../models/Question";
import QuestionWithAnswers from "../../models/QuestionWithAnswers";
import Answer from "../../models/Answer";

export interface IQuestionStore{
    questions: Question[],
    questionwithanswers? : QuestionWithAnswers,
}

export interface IAddAnswerPayload{
    toQuestion: Question,
    answer: Answer,
}