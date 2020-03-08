export interface Question{
    id: number;
    title: string;
    content: string;
    author: string;
}

export interface PagedQuestions{
    currentPage: number,
    pages: number,
    questions: Question[],
}

export default Question;
