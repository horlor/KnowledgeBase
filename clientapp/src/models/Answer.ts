export interface Answer{
    id: number;
    content: string;
    author: string;
    created?: string,
    lastUpdate?: string
}

export interface AnswerUpdateRequest{
    content: string,
}

export default Answer;