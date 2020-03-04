import React, { useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Button from "@material-ui/core/Button"
import {useLoginState} from "../../redux/user/UserHooks";
import CloseIcon from "@material-ui/icons/Close"
import { Menu, MenuItem, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
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
                <MenuItem onClick={()=>{logoutFun(); handleClose();}}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>
                    <CloseIcon/>
                    </MenuItem>
            </Menu>
            </>
    );
    else
            
        return (
            <Button color="inherit"  component={Link} to="/login">Login</Button>
        );
}
export default LoginButton;