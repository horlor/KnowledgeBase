import React from 'react'
import { Card, CardHeader, CardContent, Typography, Paper, makeStyles, Box, Button, IconButton, ListItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import { MyNotification } from '../../models/Notification';


const useStyles = makeStyles(theme => ({
    surface:{
        padding: theme.spacing(0.5),
        width:"100%"
    },
    text:{
        textDecoration: "none",
        
        color: theme.palette.text.primary
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
    const n = props.notification;
    console.log(n);
    return (
        <div className={classes.surface}
        style={(n.seen)?{background:"gainsboro"}:{}}>
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
                <IconButton onClick={props.onDelete}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton onClick={()=>props.SetSeen?.(!n.seen)}>
                    {n.seen?<VisibilityOffIcon/>:<VisibilityIcon/>}
                </IconButton>
            </Box>
            <Typography variant="body1">{n.content}</Typography>
        </div>
    );
}

export default NotificationView;