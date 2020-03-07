import React from 'react';
import Container from '@material-ui/core/Container'
import { Typography, Paper, makeStyles } from '@material-ui/core';

const useStyles= makeStyles(theme =>({
    paper:{
        marginTop: theme.spacing(2),
        width: "100%",
    }
}));

interface IProps{

}

const WelcomePage : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
            <Paper className={classes.paper}>
                <Typography variant="h3">Welcome to Viknowledge</Typography>
                <br/>
                <Typography variant="body1">Try our new knowledge sharing web application. Browse the questions we have or register and ask what you want to know.</Typography>
            </Paper>
        </Container>
    );
}

export default WelcomePage;