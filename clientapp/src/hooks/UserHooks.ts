import {useSelector, useDispatch} from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { Login, Logout, Register } from "../api/UserApi";
import { UserLoginAction, UserLogoutAction } from "../redux/user/UserReducer";
import ErrorModel from "../models/ErrorModel";
import { RegisterRequest, RegisterResponse } from "../models/LoginModels";
import { useState } from "react";
import Axios from "axios";

export const useLoggedIn = () =>
    useSelector((state : RootState) => state.user.loggedIn);

export const useLoginState =  () =>{
    const loggedIn = useSelector((state : RootState) => state.user.loggedIn);
    const dispatch : AppDispatch = useDispatch();
    const [error, setError] = useState<boolean>(false);

    const loginFun = async (username: string, password: string) =>{
        setError(false);
        if(!loggedIn){
            Login(username, password)
            .then(res => dispatch(UserLoginAction(res.username)))
            .catch(error => {setError(true);}) 
        }       
    }
    const logoutFun = () => {
        Logout();
        dispatch(UserLogoutAction());
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

