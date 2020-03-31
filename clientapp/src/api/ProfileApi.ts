import axios from 'axios'
import { ISession, RegisterRequest, RegisterResponse } from '../models/LoginModels';
import { UserDetailed, UserUpdateRequest } from '../models/User';
import { MyNotification } from '../models/Notification';


export const Login = async (username: string, password: string, stayLoggedIn : boolean): Promise<ISession> =>{
    let resp = await axios.post<ISession>(`/api/profile/login`,{username: username, password: password});
    if(resp.data.token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + resp.data.token;
        if(stayLoggedIn){
            localStorage.setItem("Viknowledge-token", resp.data.token);
            localStorage.setItem("Viknowledge-user", resp.data.username)
        }
            
    }
    return resp.data;
}

export const LoginFromStorage = () =>{
    let token = localStorage.getItem("Viknowledge-token");
    if(token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return localStorage.getItem("Viknowledge-user")
    }
    return null;
        
}


export const Logout  = () =>{
    console.log("Logout");
    axios.defaults.headers.common["Authorization"] = '';
    localStorage.removeItem("Viknowledge-token");
    localStorage.removeItem("Viknowledge-user");
}

export const Register = async( reg: RegisterRequest): Promise<RegisterResponse> =>{
    return (await axios.post<RegisterResponse>("/api/register",reg)).data
}

export const LoadProfileFromApi = async () => {
    let response = await axios.get<UserDetailed>("/api/profile");
    return response.data;
}

export const UpdateProfileToApi = async (request : UserUpdateRequest) =>{
    await axios.put("/api/profile",request)
}


export const LoadNotificationsFromApi = async() =>{
    let response = await axios.get<MyNotification[]>("/api/profile/notifications");
    return response.data;
}

export const DeleteNotification = async(notification : MyNotification) =>{
    let response = await axios.delete("/api/profile/notifications",{data: notification});
}