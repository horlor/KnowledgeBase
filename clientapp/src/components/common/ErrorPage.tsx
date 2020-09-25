import React from "react"
import { Paper, Typography, Icon, makeStyles, Container, Avatar, Box, Divider } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

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
    title: string,
    message: string,
}

const ErrorPage : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return(
        <Container maxWidth="md">
            <Paper variant="outlined" className={classes.paper}>
                <Box display="flex" justifyContent="center">
                    <ErrorIcon fontSize="large" className={classes.avatar}/>
                </Box>
                <Typography variant="h4" align="center">{props.title}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant="body1">{props.message}</Typography>
            </Paper>
        </Container>

    );
}

export default ErrorPage;