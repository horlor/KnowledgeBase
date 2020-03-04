import axios from 'axios';
import { ISession, RegisterRequest, RequestResult, RegisterResponse } from '../models/LoginModels';

export const Login = async (username: string, password: string): Promise<ISession> =>{
    let resp = await axios.post<ISession>(`/api/login`,{username: username, password: password});
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