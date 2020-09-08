import React, { useState } from 'react'
import { Container, Typography, Paper, List, ListItem, Divider, makeStyles, Box, IconButton, Menu, MenuItem, ClickAwayListener} from '@material-ui/core';
import { useNotifications } from '../../hooks/NotificationHooks';
import NotificationView from '../notification/NotificationView';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme =>({
    paper:{
        marginTop:theme.spacing(1),
    },
    title:{
        padding:"0px",
        margin:"0px"
    },
    toolbar:{
        margin:theme.spacing(1),
    },
    list:{
        margin:"0px"
    },
    listitem:{
        padding:"0px"
    }
}));

interface IProps{

}

const NotificationPage : React.FC<IProps> = () =>{
    const {notifications, error, loading, deleteNotification, setImportant, setSeen} = useNotifications();
    const [anchorEl, setAnchorEl] = useState<HTMLElement |null>(null);
    const classes = useStyles();
    if(error)
        return <ErrorView title={error.code} message={error.description}/>
    if(loading)
        return <LoadingView/>;
    return (
        <Container maxWidth="lg">
            <Paper className={classes.paper}>
                <Box display="flex" alignItems="flex-end" className={classes.toolbar}>
                    <Typography variant="h4" className={classes.title}>Notifications</Typography>
                    <Box flexGrow="1"/>
                    <IconButton
                            onClick={e =>setAnchorEl(e.currentTarget)}
                            aria-controls="notification-dropdown"
                            aria-haspopup={true}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    
                        <Menu 
                            id="notification-dropdown" 
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={()=> setAnchorEl(null)}
                            >
                            <MenuItem>Delete all seen</MenuItem>
                            <MenuItem>Delete all but stared</MenuItem>
                            <MenuItem>Delete all</MenuItem>
                        </Menu>
                </Box>
                <List className={classes.list}>
                    {
                    notifications.map(n =>
                    <>
                        <Divider/>
                        <ListItem className={classes.listitem}>
                            <NotificationView key={n.id} notification={n}
                                    onDelete={()=>deleteNotification(n)}
                                    onSetImportant={()=>setImportant(n)}
                                    onSetSeen={()=>setSeen(n)}
                                    linkTo={`/questions/${n.questionId}`}
                            />
                        </ListItem>
                    </>
                    )}
                </List>
            </Paper>
        </Container>
    );
}

export default NotificationPage;