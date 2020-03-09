import axios from 'axios';
import { ISession, RegisterRequest, RequestResult, RegisterResponse } from '../models/LoginModels';
import { User } from '../models/User';

export const Login = async (username: string, password: string): Promise<ISession> =>{
    let resp = await axios.post<ISession>(`/api/users/login`,{username: username, password: password});
    if(resp.data.token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + resp.data.token;
    }
    return resp.data;
}


export const Logout  = () =>{
    axios.defaults.headers.common["Authorization"] = undefined;
}

export const Register = async( reg: RegisterRequest): Promise<RegisterResponse> =>{
    return (await axios.post<RegisterResponse>("/api/register",reg)).data
}

export const LoadUsersFromApi = async () =>{
    let response = await axios.get<User[]>("/api/users");
    return response.data;
}