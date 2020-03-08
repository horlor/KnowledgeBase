import React from 'react';
import Container from '@material-ui/core/Container'
import { Typography, Paper, makeStyles, Box } from '@material-ui/core';
import logo from './logo.svg';

const useStyles= makeStyles(theme =>({
    paper:{
        marginTop: theme.spacing(2),
        width: "100%",
    },
    box:{
        display:"flex",
        flexDirection:"row",
    },
    logo:{
        justifySelf: "center",
        alignSelf: "center",
    },
    title:{
        alignSelf: "center",
    }
}));

interface IProps{

}

const WelcomePage : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
            <Paper className={classes.paper}>
                <Box flex flexDirection="row" className={classes.box}>
                    <img src={logo} width="10%" height="10%" alt="logo" className={classes.logo}/>
                    <Typography variant="h3" className={classes.title}>Welcome to Viknowledge</Typography>
                </Box>
                <br/>
                <Typography variant="body1">Try our new knowledge sharing web application. Browse the questions we have or register and ask what you want to know.</Typography>
            </Paper>
        </Container>
    );
}

export default WelcomePage;