import React from "react"
import { Paper, Typography, Icon, makeStyles, Container, Avatar, Box, Divider } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import ErrorModel from "../../models/ErrorModel";
import { Link } from "react-router-dom";

const useStyles =makeStyles(theme =>({
    paper:{
        marginTop:theme.spacing(2),
        alignSelf:"center",
        padding: theme.spacing(1)
    },
    avatar:{

        color:theme.palette.error.main,
        height:theme.spacing(8),
        width: theme.spacing(8), 
    },
    divider:{
        marginBottom: theme.spacing(1)
    }
}));

interface IProps{
    error: ErrorModel,
}

const ErrorPage : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return(
        <Container maxWidth="md">
            <Paper variant="outlined" className={classes.paper}>
                <Box display="flex" justifyContent="center">
                    <ErrorIcon fontSize="large" className={classes.avatar}/>
                </Box>
                <Typography variant="h4" align="center">{props.error.title}</Typography>
                <Divider className={classes.divider}/>
                {
                    props.error.code ===401?
                    <div>
                    <span>
                    You are not logged in or your session has expired, please </span>
                    <Link to="/login">sign in.</Link>
                    </div>:
                    <Typography variant="body1">{props.error.description}</Typography>
                }
            </Paper>
        </Container>

    );
}

export default ErrorPage;