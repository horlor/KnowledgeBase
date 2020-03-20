import {useSelector, useDispatch} from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { Login, Logout, Register, LoginFromStorage } from "../api/UserApi";
import { LoginAction, LogoutAction } from "../redux/reducers/LoginReducer";
import ErrorModel from "../models/ErrorModel";
import { RegisterRequest, RegisterResponse } from "../models/LoginModels";
import { useState, useEffect } from "react";
import Axios from "axios";

export const useLoginState = () =>
    useSelector((state : RootState) => state.login.loggedIn);

export const useLoginHook =  () =>{
    const loggedIn = useSelector((state : RootState) => state.login.loggedIn);
    const dispatch : AppDispatch = useDispatch();
    const [error, setError] = useState<boolean>(false);

    const loginFun = async (username: string, password: string, stayLoggedIn = false) =>{
        setError(false);
        if(!loggedIn){
            try{
                let resp = await Login(username, password, stayLoggedIn);
                dispatch(LoginAction(resp.username));
            }
            catch(exc){
                setError(true);
            }
        }       
    }
    const logoutFun = () => {
        Logout();
        dispatch(LogoutAction());
    };
    return {loggedIn, loginFun, logoutFun, error};
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
        Axios.post<RegisterResponse>("/api/users/register",reg,{validateStatus:(status)=>true}) //Need to accept everything because somewhy Axios doesn't provide the failed response's data
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
        let user = LoginFromStorage();
        if(user)
            dispatch(LoginAction(user));
    },[dispatch])
}
