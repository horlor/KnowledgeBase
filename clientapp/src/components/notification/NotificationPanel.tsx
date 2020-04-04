import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import { useNotificationsWithUpdate } from '../../hooks/NotificationHooks';
import { Link } from 'react-router-dom';


interface IProps{
    
}

const NotificationPanel : React.FC<IProps> = () =>{
    const {message, open, handleClose, forwardLink} = useNotificationsWithUpdate();
    return(
        <Snackbar 
            open={open} onClose={handleClose} autoHideDuration={15000}
            anchorOrigin={{vertical:"bottom", horizontal:"left"}}
            message={message}
            action={
                <>
                    <IconButton color="inherit" component={Link} to={forwardLink} onClick={handleClose}>
                        <ArrowForwardIcon/>
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </>
            }
            />
    );
}

export default NotificationPanel;