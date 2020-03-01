import React from "react"
import { Paper, Typography, Icon, makeStyles, Container } from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles =makeStyles({
    paper:{
        marginTop:"10px",
        alignSelf:"center",
    }
})

interface IProps{
    title: string,
    message: string,
}

const ErrorView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return(
        <Container maxWidth="md">
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h4" align="center">{props.title}</Typography>
                <Typography variant="body1">{props.message}</Typography>
            </Paper>
        </Container>

    );
}

export default ErrorView;