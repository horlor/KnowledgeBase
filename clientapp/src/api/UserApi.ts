import axios from 'axios';
import { ISession, RegisterRequest, RequestResult, RegisterResponse } from '../models/LoginModels';
import { User, UserDetailed } from '../models/User';

export const Login = async (username: string, password: string, stayLoggedIn : boolean): Promise<ISession> =>{
    let resp = await axios.post<ISession>(`/api/users/login`,{username: username, password: password});
    if(resp.data.token){
        SetTokenInAxios(resp.data.token);
        if(stayLoggedIn){
            localStorage.setItem("Viknowledge-token", JSON.stringify(resp.data.token));
            localStorage.setItem("Viknowledge-user", resp.data.username)
        }
            
    }
    return resp.data;
}

export const LoginFromStorage = () =>{
    let token = localStorage.getItem("Viknowledge-token");
    console.log(token);
    if(token != null){
        SetTokenInAxios(token);
        return localStorage.getItem("Viknowledge-user")
    }
    return null;
        
}


export const Logout  = () =>{
    DeleteTokenInAxios();
    localStorage.removeItem("Viknowledge-token");
    localStorage.removeItem("Viknowledge-user");
}

export const Register = async( reg: RegisterRequest): Promise<RegisterResponse> =>{
    return (await axios.post<RegisterResponse>("/api/register",reg)).data
}

export const LoadUsersFromApi = async () =>{
    let response = await axios.get<User[]>("/api/users");
    return response.data;
}

export const LoadUserDetailedFromApi = async (username: string) =>{
    let response = await axios.get<UserDetailed>(`/api/users/${username}`);
    return response.data;
}

const SetTokenInAxios  = (token: string) => {
    console.log("token")
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

const DeleteTokenInAxios = () =>{
    axios.defaults.headers.common["Authorization"] = undefined;
}