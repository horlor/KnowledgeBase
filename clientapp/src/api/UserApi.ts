import axios from 'axios';
import { ISession, RegisterRequest, RequestResult } from '../models/LoginModels';

export const Login = async (username: string, password: string): Promise<ISession> =>{
    console.log(username)
    console.log(password)
    let resp = await axios.post<ISession>(`/api/login`,{username: username, password: password});
    if(resp.data.token){
        axios.defaults.headers.common["Authorization"] =
        "Bearer " + resp.data.token;
    }
    console.log(resp);
    return resp.data;
}


export const Logout  = () =>{
    axios.defaults.headers.common["Authorization"] = undefined;
}

export const Register = async( reg: RegisterRequest): Promise<RequestResult> =>{
    let resp = await axios.post("/api/register",reg);
    if(resp.status === 201)
        return {success: true};
    return {success: false, error : {title:"Something terrible happened", message:"Unknown"}};
}