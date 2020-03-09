import React from 'react';
import { Paper, Box, Avatar, Typography, Divider, Chip, makeStyles } from '@material-ui/core';
import { UserDetailed } from '../../models/User';

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

interface IProps{
    user: UserDetailed
}

const UserDetailView : React.FC<IProps> = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.surface}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar className={classes.avatar}>
                    {props.user.userName.toUpperCase().slice(0,1)}
                </Avatar>
                <Typography variant="h4">{props.user.userName}</Typography>
            </Box>
            <Divider/>
            <Typography>{`Name: ${props.user.firstName} ${props.user.lastName}`}</Typography>
            <Typography>{`Email: ${props.user.email}`}</Typography>
            <Divider/>
            <Typography className={classes.header}>Introduction</Typography>
            <Typography>{props.user.introduction}</Typography>
            <Divider/>
            <Typography className={classes.header}>Known areas:</Typography>
            <Chip variant="outlined" label="C#"/>
            <Chip variant="outlined" label="Asp.Net"/>
            <Chip variant="outlined" label="React"/>
        </Paper>
    );

}

export default UserDetailView;