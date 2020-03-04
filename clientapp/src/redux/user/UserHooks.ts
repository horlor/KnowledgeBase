import {useSelector, useDispatch} from "react-redux";
import { RootState, AppDispatch } from "../Store";
import { Login, Logout, Register } from "../../api/UserApi";
import { UserLoginAction, UserLogoutAction } from "./UserReducer";
import ErrorModel from "../../models/ErrorModel";
import { RegisterRequest } from "../../models/LoginModels";
import { useState } from "react";

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
        let result = await Register(reg);
        setLoading(false);
        if(result.errors)
            setErrors(result.errors);
        if(result.success)
            setSuccess(result.success);
    }

    return {loading, success, registerFun, errorList, retry};
}

