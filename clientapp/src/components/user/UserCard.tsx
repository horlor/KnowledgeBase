import React from 'react';
import { Card, Typography, makeStyles, Box, Avatar, Divider, Chip } from '@material-ui/core';
import { User } from '../../models/User';
import { Link } from 'react-router-dom';

const useStyles = makeStyles( theme => ({
  link:{
    textDecoration: "none",
  },
    surface:{
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    avatar:{
        margin: theme.spacing(1),
    },
    section:{
      margin: theme.spacing(1),
    },
    headerFont:{
      fontWeight: "bold",
    }
}));

interface IProps{
    user: User,
    to: string,
}

const UserCard : React.FC<IProps> = (props) =>{
    const classes = useStyles();

    return (
      <Link to={props.to} className={classes.link}>
        <Card className={classes.surface}>
          <Box display="flex" flexDirection="row">
            <Box className={classes.avatar}>
              <Avatar>{props.user.userName.toUpperCase().slice(0, 1)}</Avatar>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h5">{props.user.userName}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box className={classes.section}>
            <Typography>{`Name: ${props.user.firstName} ${props.user.lastName}`}</Typography>
            <Typography>{`Email: ${props.user.email}`}</Typography>
          </Box>
          <Divider />
          <Box className={classes.section}>
            <Typography className={classes.headerFont}>Primary topics:</Typography>
              {props.user.topics.map(topic =>
                  <Chip key={topic.id} label={topic.name} />
                )}
          </Box>
        </Card>
      </Link>
    );
}

export default UserCard;