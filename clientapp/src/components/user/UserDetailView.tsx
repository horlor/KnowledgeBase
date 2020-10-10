import React from 'react';
import { Paper, Box, Typography, Divider, Chip, makeStyles, Container, IconButton } from '@material-ui/core';
import { UserDetailed } from '../../models/User';
import EditIcon from '@material-ui/icons/Edit';
import UserAvatar from './UserAvatar';




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
    },
    introTypo:{
        //To allow whitespaces in the introduction
        whiteSpace:"pre-wrap"
    }
}));

interface IProps{
    user: UserDetailed,
    editable?: boolean,
    onEditClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
    
}

const UserDetailView : React.FC<IProps> = (props) => {

    const classes = useStyles();
    return (
        <Container maxWidth="xl">
        <Paper className={classes.surface}>
        <Box display="flex" flexDirection="row" alignItems="center">
            <UserAvatar className={classes.avatar} username={props.user.userName}/>
            <Typography variant="h4">{props.user.userName}</Typography>
            <Box flexGrow={1}/>
            {(props.editable)?
            <IconButton onClick={props.onEditClick}>
                <EditIcon/>
            </IconButton>
            :
            ""}
        </Box>
        <Divider/>
        <Typography>{`Name: ${props.user.firstName} ${props.user.lastName}`}</Typography>
        <Typography>{`Email: ${props.user.email}`}</Typography>
        <Divider/>
        <Typography className={classes.header}>Introduction</Typography>
        <Typography className={classes.introTypo}>{props.user.introduction}</Typography>
        <Divider/>
        <Typography className={classes.header}>Known topics:</Typography>
          {props.user.topics.map(topic =>
              <Chip variant="outlined" key={topic.id} label={topic.name} />
            )}
        </Paper>
    </Container>
    );

}

UserDetailView.defaultProps={
    editable:false,
    onEditClick: ()=>{},
};

export default UserDetailView;