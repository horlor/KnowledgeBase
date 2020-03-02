import React, { useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Button from "@material-ui/core/Button"
import {useLoggedIn, useLoginState} from "../../redux/user/UserHooks";
import { useDispatch } from "react-redux";
import { UserLoginAction } from "../../redux/user/UserReducer";
import { Menu, MenuItem } from "@material-ui/core";
interface IProps{

}

const LoginButton : React.FC<IProps> = (props) =>{
    const {loggedIn, logoutFun} = useLoginState();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    }

    if(loggedIn)
        return (
            <>
            <IconButton color="inherit"
                onClick={(event)=> setAnchorEl(event.currentTarget)}
                aria-controls="userdropdown"
                aria-haspopup={true}
            >
                <AccountCircle/>
            </IconButton>
            <Menu
                id="userdropdown"
                anchorEl={anchorEl}
                keepMounted
                open ={!!anchorEl}
                onClose={handleClose}
            >
                <MenuItem>Your profile</MenuItem>
                <MenuItem onClick={logoutFun}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>Close</MenuItem>
            </Menu>
            </>
    );
    else
            
        return (
            <Button color="inherit" href="/login">Login</Button>
        );
}
export default LoginButton;