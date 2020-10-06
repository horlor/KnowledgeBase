import { ISession } from "../models/LoginModels"
import axios, { AxiosError } from 'axios'
import { NotificationService } from "./NotificationApi";

class AuthServiceClass{
	private staySignedIn : boolean = false

	constructor(){
		axios.interceptors.response.use(
			response =>{
				return response;
			},
			async (ex)=>{
				if("isAxiosError" in ex){
					let error = ex as AxiosError;
					const originalRequest : any = error.config
					console.log(originalRequest);
					if(error.response?.status === 401 && !originalRequest._retry){
						originalRequest._retry = true
						const session = await this.refreshAccessToken();
						if(session){
							axios.defaults.headers.common["Authorization"] = "Bearer " + session.accessToken;
							originalRequest.headers["Authorization"]="Bearer " + session.accessToken;
							return axios(originalRequest);
						}
					}
				}
				return Promise.reject(ex);
			});
	}

	private setSession =(session :ISession)=>{
		axios.defaults.headers.common["Authorization"] = "Bearer " + session.accessToken;
		sessionStorage.setItem("username", session.username);
		sessionStorage.setItem("role",session.role);
		sessionStorage.setItem("accessToken",session.accessToken);
		sessionStorage.setItem("refreshToken",session.refreshToken);
		if(this.staySignedIn){
			localStorage.setItem("username", session.username)
			localStorage.setItem("role",session.role);
			localStorage.setItem("accessToken",session.accessToken);
			localStorage.setItem("refreshToken",session.refreshToken);
		}
	}
	private GetFromStorages = (identifier: string): string =>{
		let item = localStorage.getItem(identifier);
		if(item)
			return item;
		item = sessionStorage.getItem(identifier);
		return item?item:"";
	}

	public get AccessToken(){
		return this.GetFromStorages("accessToken")
	}

	public get RefreshToken(){
		return this.GetFromStorages("refreshToken");
	}

	public get Username(){
		return this.GetFromStorages("username");
	}

	public get Role(){
		return this.GetFromStorages("role");
	}

	public  Login = async(username: string, password: string, stayLoggedIn : boolean): Promise<ISession> =>{
		let resp = await axios.post<ISession>(`/api/profile/login`,{username: username, password: password});
		this.staySignedIn = stayLoggedIn;
		if(resp.data){
			this.setSession(resp.data)
			await this.refreshAccessToken()
		}
		return resp.data;
	}

	public LoginFromStorage = ()=>{
		let refreshToken = localStorage.getItem("refreshToken")
		if(refreshToken)
			this.staySignedIn = true;
		this.refreshAccessToken();
		axios.defaults.headers.common["Authorization"] = "Bearer " + this.AccessToken;
		if(this.Role && this.Username)
		return {
			username: this.Username,
			role: this.Role
		};
		return null;
	}



	public refreshAccessToken = async ()=>{
		const username = this.Username,
			accessToken = this.AccessToken,
			refreshToken = this.RefreshToken;
		try{
			if(username && refreshToken){
				var ret = (await axios.post<ISession>("/api/profile/refresh",{
					username, accessToken, refreshToken
				})).data;
				this.setSession(ret);
				NotificationService.reconnect();
				return ret;
			}
			return null;
		}
		catch(ex){
			return null;
		}
	}


	public Logout = ()=>{
		axios.defaults.headers.common["Authorization"] = "";
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("role");
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("refreshToken");
		if(this.staySignedIn){
			localStorage.removeItem("username")
			localStorage.removeItem("role");
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		}
	}

}

const AuthService = new AuthServiceClass();

export default AuthService;