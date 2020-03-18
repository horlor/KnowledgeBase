import { Topic } from "./Topic";

export interface User{
    userName: string,
    email: string,
    firstName: string,
    lastName: string
    topics: Topic[],
}

export interface UserDetailed extends User{
    introduction: string,
}