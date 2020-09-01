import axios from 'axios';
import { User, UserDetailed, UserSearchResponse } from '../models/User';
import { UrlBuilder } from '../helpers/UrlBuilder';

export const LoadUsersFromApi = async () =>{
    let response = await axios.get<User[]>("/api/users");
    return response.data;
}

export const LoadUserDetailedFromApi = async (username: string) =>{
    let response = await axios.get<UserDetailed>(`/api/users/${username}`);
    return response.data;
}

export const LoadUsersFromApiSearch = async (page: number, pageSize: number, search:string)=>{
    const urlBuilder = new UrlBuilder(`/api/users/search`);
    urlBuilder.appendWithQueryParam("page",page);
    urlBuilder.appendWithQueryParam("countPerPage",pageSize);
    urlBuilder.appendWithQueryParam("anywhere",search);
    let response = await axios.get<UserSearchResponse>(urlBuilder.get());
    return response.data;
}

export const GetAvatarPathForUser = (user: User) =>{
    return `${axios.defaults.baseURL}api/users/${user.userName}/avatar`;
}