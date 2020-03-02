import React from "react"
import { Paper, Typography, Icon, makeStyles, Container, Avatar } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles =makeStyles(theme =>({
    paper:{
        marginTop:"10px",
        alignSelf:"center",
    },
    avatar:{
        color:theme.palette.error.main,
        height:theme.spacing(8),
        width: theme.spacing(8), 
    }
}));

interface IProps{
    title: string,
    message: string,
}

const ErrorView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return(
        <Container maxWidth="md">
            <Paper variant="outlined" className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ErrorIcon/>
                </Avatar>
                <Typography variant="h4" align="center">{props.title}</Typography>
                <Typography variant="body1">{props.message}</Typography>
            </Paper>
        </Container>

    );
}

export default ErrorView;