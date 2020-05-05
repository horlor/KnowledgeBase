import { Topic } from "./Topic";
import Answer from "./Answer";

export interface Question{
    id: number;
    title: string;
    content: string;
    author: string;
    created?: string,
    lastUpdate?: string,
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

export interface QuestionUpdateRequest{
    content: string;
}

export interface QuestionSearchRequest{
    title: string | null;
    content: string | null;
    anywhere: string | null;
    topic: number | null;
    page: number
}

export interface QuestionSearchResult{
    questions: Question[],
    page: number,
    pageCount: number,
    pageSize: number,
    count: number,
}

export default Question;
