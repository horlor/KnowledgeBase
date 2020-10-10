import React, { useState } from 'react'
import { Container, Typography, Paper, List, ListItem, Divider, makeStyles, Box, IconButton, Menu, MenuItem, ClickAwayListener} from '@material-ui/core';
import { useNotifications } from '../../hooks/NotificationHooks';
import NotificationView from '../notification/NotificationView';
import LoadingView from '../common/LoadingView';
import ErrorPage from '../common/ErrorPage';
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
    const {notifications, error, loading, deleteNotification, setImportant, setSeen, deleteFunctions} = useNotifications();
    const [anchorEl, setAnchorEl] = useState<HTMLElement |null>(null);
    const classes = useStyles();
    if(error)
        return <ErrorPage title={error.title} message={error.description}/>
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
                            aria-controls="notificationpage-dropdown"
                            aria-haspopup={true}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    
                        <Menu 
                            id="notificationpage-dropdown" 
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={()=> setAnchorEl(null)}
                            >
                            <MenuItem onClick={deleteFunctions.AllSeen}>Delete all seen</MenuItem>
                            <MenuItem onClick={deleteFunctions.AllButImportant}>Delete all but stared</MenuItem>
                            <MenuItem onClick={deleteFunctions.All}>Delete all</MenuItem>
                        </Menu>
                </Box>
                <List className={classes.list}>
                    {
                    notifications.map(n =>
                    <React.Fragment key={n.id}>
                        <Divider/>
                        <ListItem className={classes.listitem}>
                            <NotificationView  notification={n}
                                    onDelete={()=>deleteNotification(n)}
                                    SetImportant={(b)=>setImportant(n,b)}
                                    SetSeen={(b)=>setSeen(n,b)}
                                    linkTo={`/questions/${n.questionId}`}
                            />
                        </ListItem>
                    </React.Fragment>
                    )}
                </List>
            </Paper>
        </Container>
    );
}

export default NotificationPage;