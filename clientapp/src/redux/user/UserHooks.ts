import {useSelector, useDispatch} from "react-redux";
import { RootState } from "../Store";
import { Login, Logout } from "../../api/UserApi";
import { UserLoginAction, UserLogoutAction } from "./UserReducer";
import ErrorModel from "../../models/ErrorModel";

export const useLoggedIn = () =>
    useSelector((state : RootState) => state.user.loggedIn);

export const useLoginState =  () =>{
    const loggedIn = useSelector((state : RootState) => state.user.loggedIn);
    const dispatch = useDispatch();
    const loginFun = async (username: string, password: string) =>{
        if(!loggedIn){
            await Login(username, password);
            dispatch(UserLoginAction(username))
        }       
    }
    const logoutFun = () => {
        Logout();
        dispatch(UserLogoutAction);
    };
    return {loggedIn, loginFun, logoutFun};
}

