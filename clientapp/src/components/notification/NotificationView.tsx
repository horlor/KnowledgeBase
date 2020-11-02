import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Typography, Paper, makeStyles, Box, Button, IconButton, ListItem, Menu, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import { MyNotification } from '../../models/Notification';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles(theme => ({
    surface:{
        padding: theme.spacing(0.5),
        width:"100%"
    },
    text:{
        textDecoration: "none",
        
        color: theme.palette.text.primary
    },
    seenPaper:{
        backgroundColor: theme.palette.greyedOut.paper
    }
}))

interface IProps{
    notification: MyNotification
    onDelete?: ()=>void,
    SetImportant?: (b: boolean)=>void,
    SetSeen?: (b: boolean)=>void,
    linkTo?: string
}

const NotificationView : React.FC<IProps> = props =>{
    const classes = useStyles();
    const [anchorRef, setAnchorRef] = useState<HTMLElement |null>(null);
    const n = props.notification;
    console.log(n);
    return (
        <div className={`${classes.surface} ${n.seen?classes.seenPaper:''}`}>
            <Box display="flex" alignItems="center">
            <IconButton onClick={()=>props.SetImportant?.(!n.important)}>
                    <StarIcon color={n.important?"primary":"action"}/>
                </IconButton>
                <Typography variant="h6" 
                    component={Link} 
                    to={props.linkTo?props.linkTo:"#"}
                    onClick={()=> props.SetSeen?.(true)}
                    className={classes.text}>{n.title}</Typography>
                <Box flexGrow="1"/>
                <IconButton
                    onClick={e => setAnchorRef(e.currentTarget)}
                    aria-controls="notification-context"
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu 
                    id="notification-context"
                    open={!!anchorRef}
                    anchorEl={anchorRef}
                    onClose={()=>setAnchorRef(null)}
                >
                    <MenuItem onClick={props.onDelete}>Delete</MenuItem>
                    <MenuItem onClick={()=> props.SetSeen?.(!n.seen)}>{n.seen?"Mark unseen":"Mark seen"}</MenuItem>
                </Menu>
            </Box>
            <Typography variant="body1">{n.content}</Typography>
        </div>
    );
}

export default NotificationView;