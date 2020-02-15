import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, IconButton, makeStyles, Grid, Drawer, Button} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    grow:{
        flexGrow:1
    },
    menuitem:{
        display:"block",
        marginTop: "5px",
        background: "white"
    }
});

const NavigationView : React.FC = (props)=>{
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
            <Grid container direction="row" justify="center">
                <Grid item>
                    <Button variant="outlined" className={classes.menuitem}>Akármi</Button>
                    <Button className={classes.menuitem}>Akármi</Button>
                    <Button className={classes.menuitem}>Akármi</Button>
                </Grid>
                <Grid item alignContent="center" flex-grow={1}>
                    {props.children}
                </Grid>
            </Grid>
        </>
        );
    }
export default NavigationView;