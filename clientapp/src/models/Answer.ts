export interface Answer{
    id: number;
    content: string;
    author: string;
    created?: string,
    lastUpdate?: string,
    type?: AnswerType
}

export enum AnswerType{
    Simple = 0,
    Closer = 1,
    Reopener = 2,
}

export interface AnswerUpdateRequest{
    content: string,
}

export default Answer;