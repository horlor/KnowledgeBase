import axios from 'axios';
import { ISession, RegisterRequest, RequestResult, RegisterResponse } from '../models/LoginModels';
import { User, UserDetailed, UserUpdateRequest } from '../models/User';

export const LoadUsersFromApi = async () =>{
    let response = await axios.get<User[]>("/api/users");
    return response.data;
}

export const LoadUserDetailedFromApi = async (username: string) =>{
    let response = await axios.get<UserDetailed>(`/api/users/${username}`);
    return response.data;
}
