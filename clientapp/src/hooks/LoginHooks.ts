import {useSelector, useDispatch} from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { Login, Logout, Register } from "../api/UserApi";
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

    const loginFun = async (username: string, password: string) =>{
        setError(false);
        if(!loggedIn){
            Login(username, password)
            .then(res => dispatch(LoginAction(res.username)))
            .catch(error => {setError(true);}) 
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

