import axios, { AxiosError } from 'axios'
import { ISession, RegisterRequest, RegisterResponse } from '../models/LoginModels';
import { UserDetailed, UserUpdateRequest } from '../models/User';
import { MyNotification, PendingNotificationDto } from '../models/Notification';


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

export const DeleteAllNotifications  =async(options: number)=>{
    await axios.delete(`/api/profile/notifications?options=${options}`);
}

export const PatchNotificationSeen = async(id: number, b: boolean) =>{
    await axios.patch(`/api/profile/notifications/${id}/seen`,{B:b});
}

export const PatchNotificationImportant = async(id: number, b: boolean) =>{
    await axios.patch(`/api/profile/notifications/${id}/important`,{B:b});
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

export const RequestPasswordRecovery = async(username: string)=>{
    await axios.post("/api/profile/password_recovery",{username:username});
}

export const RequestPasswordReset = async(username: string, token: string, password: string)=>{
    await axios.post("/api/profile/password_reset",{
        username: username,
        token: token,
        password: password,
    });
}

export const ChangePassword = async(oldPassword: string, newPassword: string)=>{
    await axios.post("/api/profile/password_change",{
        oldPassword, newPassword
    });
}
