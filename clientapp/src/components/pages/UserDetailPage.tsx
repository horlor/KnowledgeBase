import React from 'react';
import { Container, Paper, Box, Avatar, Typography, Divider, Chip, makeStyles } from '@material-ui/core';
import { UserDetailed, User } from '../../models/User';
import { RouteComponentProps } from 'react-router-dom';
import { useSelectedUserHook } from '../../hooks/UserHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';

const useStyles = makeStyles( theme => ({
    surface:{
        width:"100%",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    header:{
        fontWeight:"bold",
    },
    avatar:{
        margin: theme.spacing(1),
    }
}));

type IProps = RouteComponentProps<{
    username: string;
}>;

const UserDetailPage : React.FC<IProps> = (props: IProps) =>{
    const {user, loading, error} = useSelectedUserHook(props.match.params.username);
    const classes = useStyles();
    if(loading)
        return <LoadingView/>;
    if(error!== undefined)
        return <ErrorView title={error.code} message={error.description}></ErrorView>
    if(user!==undefined)
        return (
        <Container maxWidth="xl">
            <Paper className={classes.surface}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar className={classes.avatar}>
                    {user?.userName.toUpperCase().slice(0,1)}
                </Avatar>
                <Typography variant="h4">{user.userName}</Typography>
            </Box>
            <Divider/>
            <Typography>{`Name: ${user.firstName} ${user.lastName}`}</Typography>
            <Typography>{`Email: ${user.email}`}</Typography>
            <Divider/>
            <Typography className={classes.header}>Introduction</Typography>
            <Typography>{user.introduction}</Typography>
            <Divider/>
            <Typography className={classes.header}>Known topics:</Typography>
            <Chip variant="outlined" label="C#"/>
            <Chip variant="outlined" label="Asp.Net"/>
            <Chip variant="outlined" label="React"/>
            </Paper>
        </Container>
    );
    else
        return <p>""</p>;
}

export default UserDetailPage;