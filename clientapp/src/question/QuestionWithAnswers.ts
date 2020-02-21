import Answer from "./Answer";

interface QuestionWithAnswers{
    id: number;
    title: string;
    content: string;
    author: string;
    authorid: number;
    answers: Answer[];

}

export default QuestionWithAnswers;