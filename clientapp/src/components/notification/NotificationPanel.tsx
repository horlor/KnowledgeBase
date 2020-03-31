import React, { useState } from 'react'
import { Snackbar, Button, IconButton, Icon } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArchiveIcon from '@material-ui/icons/Archive';
import CloseIcon from '@material-ui/icons/Close';
import { useNotificationsWithUpdate } from '../../hooks/NotificationHooks';


interface IProps{
    
}

const NotificationPanel : React.FC<IProps> = props =>{
    const [open, setOpen] = useState(true);

    const handleClose = () =>{
        setOpen(false);
    }

    useNotificationsWithUpdate();
    return(
        <Snackbar 
            open={open} onClose={handleClose} autoHideDuration={15000}
            anchorOrigin={{vertical:"bottom", horizontal:"left"}}
            message={"Testing the snackbar"}
            action={
                <>
                    <IconButton color="inherit">
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