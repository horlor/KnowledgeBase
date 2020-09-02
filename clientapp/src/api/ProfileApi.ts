import axios from 'axios'
import { ISession, RegisterRequest, RegisterResponse } from '../models/LoginModels';
import { UserDetailed, UserUpdateRequest } from '../models/User';
import { MyNotification, PendingNotificationDto } from '../models/Notification';


export const Login = async (username: string, password: string, stayLoggedIn : boolean): Promise<ISession> =>{
    let resp = await axios.post<ISession>(`/api/profile/login`,{username: username, password: password});
    if(resp.data.token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + resp.data.token;
        if(stayLoggedIn){
            localStorage.setItem("Viknowledge-token", resp.data.token);
            localStorage.setItem("Viknowledge-user", resp.data.username)
            localStorage.setItem("Viknowledge-role", resp.data.role);
        }
            
    }
    return resp.data;
}

export const LoginFromStorage = () =>{
    let token = localStorage.getItem("Viknowledge-token");
    if(token){
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        let username = localStorage.getItem("Viknowledge-user");
        let role = localStorage.getItem("Viknowledge-role");
        if(username && role)
        return {
                username:username,
                role: role,
            };
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
    let response = await axios.delete(`/api/profile/notifications/${notification.id}`);
}

export const PatchNotificationFinished = async(id: number, finished: boolean) =>{
    await axios.patch(`/api/profile/notifications/${id}/finished`,{finished:finished});
}

export const LoadPendingNotifications = async() =>{
    let response = await axios.get<PendingNotificationDto>("/api/profile/notifications/pending");
    return response.data;
}

export const UploadAvatar = async(fileList: FileList) =>{
    const file = fileList.item(0);
    if(file){
        let data = new FormData();
        data.append("File",file);
        console.log(data)
        try{
            const a = await axios.put("/api/profile/avatar",data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
        }
        finally{
            console.log('akarmi');
        }
        
    }
}

export const DeleteAvatar = async () =>{
    await axios.delete("/api/profile/avatar");
}
