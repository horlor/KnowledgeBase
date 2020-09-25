import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, makeStyles, Select, Button, Grid } from '@material-ui/core';
import { useAdminHook } from '../../hooks/AdminHooks';
import ErrorPage from '../common/ErrorPage';
import LoadingView from '../common/LoadingView';

interface IProps{

}

const useStyles = makeStyles(theme => ({
    paper:{
        display:"flex",
        flexDirection:"row",
        height:"calc(100% - 20px)",
        marginTop:"10px",
        marginBottom:"10px"
    },
    detail:{
        margin: theme.spacing(1),
        borderLeft:"solid 2px lightgray",
        padding: theme.spacing(1),
    },
    listitem:{
        textAlign: "center",
    },
    row:{
        display:"flex",
        flexDirection:"row",
    },
    select:{
        minWidth: "200px"
    },
    typography:{
        display: "inline-block",
        minWidth: "150px",
        marginRight: theme.spacing(1)
    },
    label:{

    }
}))

const AdminPage : React.FC<IProps> = (props: IProps) =>{
    const {users, error, selectedIndex, onItemSelected,selected, onRoleChange, saveChanges} = useAdminHook();
    const classes = useStyles();

    if(error)
        return <ErrorPage title={error.title} message={error.title}/>;
    if(users)
        return (
            <Container>
                <Paper className={classes.paper}>
                    <Box width="250px">
                        <List>
                    {users.map((user,idx)=>
                        <ListItem key={user.userName} selected={idx === selectedIndex} onClick={()=>onItemSelected(user,idx)} className={classes.listitem}>
                        <ListItemText>{`${user.userName} - ${user.firstName} ${user.lastName}`}</ListItemText>
                        </ListItem>)}
                        </List>
                    </Box>
                    <Box flexGrow={1} className={classes.detail}>
                        {(selected?
                        <>
                            <Box>
                                <Typography className={classes.typography}>Username:</Typography>
                                <Typography className={classes.typography}>{selected.userName}</Typography>
                            </Box>
                            <Box>
                                <Typography className={classes.typography}>Name:</Typography>
                                <Typography className={classes.typography}>{`${selected.firstName} ${selected.lastName}`}</Typography>
                            </Box>
                            <Box>
                                <Typography className={classes.typography}>Email:</Typography>
                                <Typography className={classes.typography}>{selected.email}</Typography>
                            </Box>
                            <Box className={classes.row} display="flex" alignItems="center">
                                <Typography className={classes.typography}>Role:</Typography>
                                <Select value={selected.role}  className={classes.select}
                                onChange={(e)=>onRoleChange(e.target.value as string)}>
                                    <option value="User">User</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="Admin">Adminstrator</option>
                                </Select>
                            </Box>
                            <Button onClick={()=>saveChanges()}>Save role changes</Button>
                        </>:
                        "")}
                    </Box>
                </Paper>
        </Container>
        );
    else
        return <LoadingView/>;
}

export default AdminPage;