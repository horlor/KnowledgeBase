import React from 'react';
import { Card, Typography, makeStyles, Box, Avatar } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    surface:{
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    gridbox:{
        margin: theme.spacing(1),
    }
}));

interface IProps{
    username: string,
    email: string,
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const UserCard : React.FC<IProps> = (props) =>{
    const classes = useStyles();

    return (
        <Card className={classes.surface} onClick={props.onClick}>
            <Box display="flex" flexDirection="row">
                <Box className={classes.gridbox}>
                    <Avatar>
                        {props.username.toUpperCase().slice(0,1)}
                    </Avatar>
                </Box>
                <Box>
                    <Typography variant="h5">{props.username}</Typography>
                    <Typography variant="body1">{`Email: ${props.email}`}</Typography>
                </Box>
            </Box>
        </Card>
    );
}

export default UserCard;