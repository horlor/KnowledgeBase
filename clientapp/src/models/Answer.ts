export interface Answer{
    id: number;
    content: string;
    author: string;
    created?: string,
    lastUpdate?: string,
    moderator?: string,
    moderatorMessage?: string,
    type?: AnswerType
}

export enum AnswerType{
    Simple = 0,
    Closer = 1,
    Reopener = 2,
    HiddenByModerator =3,
    Deleted = 4,
}

export interface AnswerUpdateRequest{
    content: string,
}

export default Answer;