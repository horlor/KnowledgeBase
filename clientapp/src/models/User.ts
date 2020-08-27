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

export interface UserUpdateRequest{
    email: string,
    firstName: string,
    lastName: string
    topics: Topic[],
    introduction: string,
}

export interface UserWithRole{
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
}

export interface UserSearchResponse{
    page: number,
    pageSize: number,
    pageCount: number,
    count: number,
    users: User[],
}

