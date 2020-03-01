import React from "react"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Button from "@material-ui/core/Button"
import {useLoggedIn} from "../../redux/user/UserHooks";
import { useDispatch } from "react-redux";
import { UserLoginAction } from "../../redux/user/UserReducer";
interface IProps{

}

const LoginButton : React.FC<IProps> = (props) =>{
    const loggedIn = useLoggedIn();
    const dispatch = useDispatch()
    if(loggedIn)
        return (
            <IconButton color="inherit">
                <AccountCircle/>
            </IconButton>
    );
    else
            
        return (
            <Button color="inherit" onClick={() => dispatch(UserLoginAction("akarmi"))}>Login</Button>
        );
}
export default LoginButton;