import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, makeStyles} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    grow:{
        flexGrow:1
    }
});


const NavigationView : React.FC = ()=>{
    const classes = useStyles();
        return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" color="inherit">Viknowledge</Typography>
                    <div className={classes.grow}/>
                    
                    <IconButton color="inherit">
                        <PersonIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar></Toolbar>
        </>
        );
    }
export default NavigationView;