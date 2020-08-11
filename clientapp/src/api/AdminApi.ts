import Axios from "axios"
import { User, UserWithRole } from "../models/User"


export const GetUsers = async() =>{
	return await Axios.get<User[]>("/api/admin/users");
}

export const GetUserWithRole = async(username: string) =>{
	return await Axios.get<UserWithRole>(`/api/admin/users/${username}`)
}