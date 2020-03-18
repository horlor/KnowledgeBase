import { Topic } from "./Topic";
import Answer from "./Answer";

export interface Question{
    id: number;
    title: string;
    content: string;
    author: string;
    topic: Topic,
}

export interface PagedQuestions{
    currentPage: number,
    pages: number,
    questions: Question[],
}

export interface QuestionWithAnswers extends Question{
    answers: Answer[];

}

export default Question;
