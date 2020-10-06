import {useSelector, useDispatch} from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { LoginAction, LogoutAction } from "../redux/reducers/LoginReducer";
import ErrorModel from "../models/ErrorModel";
import { RegisterRequest, RegisterResponse } from "../models/LoginModels";
import { useState, useEffect } from "react";
import Axios from "axios";
import { GetAvatarPathForUser } from "../api/UserApi";
import AuthService from "../api/AuthService";
import { NotificationService } from "../api/NotificationApi";

export const useLoggedInState = () =>
    useSelector((state : RootState) => state.login.loggedIn);

export const useLoginState = () =>{
    const username = useSelector((state: RootState) => state.login.username);
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
    const role = useSelector((state: RootState)=> state.login.role);

    return {username, loggedIn, role};
}

export const useLoginHook =  () =>{
    const loggedIn = useSelector((state : RootState) => state.login.loggedIn);
    const user = useSelector((state: RootState) => state.login.username);
    const dispatch : AppDispatch = useDispatch();
    const [error, setError] = useState<boolean>(false);

    const avatarPath = user? GetAvatarPathForUser(user):undefined;

    const loginFun = async (username: string, password: string, stayLoggedIn = false) =>{
        setError(false);
        if(!loggedIn){
            try{
                let resp = await AuthService.Login(username, password, stayLoggedIn);
                dispatch(LoginAction(resp));
            }
            catch(exc){
                setError(true);
            }
        }       
    }
    const logoutFun = () => {
        AuthService.Logout();
        dispatch(LogoutAction());
    };
    return {loggedIn, loginFun, avatarPath, logoutFun, error};
}

export const useRegisterHook = ()=>{
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorList, setErrors]= useState<ErrorModel[]>([]); 
    
    const retry = () =>{
        setLoading(false);
        setSuccess(false);
        setErrors([]);
    }

    const registerFun = async (reg : RegisterRequest) =>{
        retry();
        setLoading(true);
        Axios.post<RegisterResponse>("/api/profile/register",reg,{validateStatus:(status)=>true}) //Need to accept everything because somewhy Axios doesn't provide the failed response's data
        .then(response => {
            if(response.status === 200){
                setSuccess(true);
            }
            else{
                setErrors(response.data.errors);
            }
        });
        setLoading(false);
    
    }

    return {loading, success, registerFun, errorList, retry};
}


export const useCheckSavedLoginHook = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
            let savedsession = AuthService.LoginFromStorage();
            if(savedsession)
                dispatch(LoginAction(savedsession));
    },[dispatch])
}
