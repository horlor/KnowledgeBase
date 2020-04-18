import ErrorModel from "./ErrorModel";

export interface ISession{
    username: string,
    token: string,
    role: string,
}

export interface RegisterRequest{
    username: string,
    password: string,
    email: string,
}

export interface RequestResult{
    success: boolean,
    error?: ErrorModel
}

export interface RegisterResponse{
    username: string,
    success: boolean,
    errors: ErrorModel[],    
}

