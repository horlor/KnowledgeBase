import React, { ChangeEvent, useState } from 'react';
import {  Typography, FormControl, InputLabel, Input, FormHelperText, Container, makeStyles, createStyles, Paper, Button, Box, FormLabel, TextField } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme => createStyles({
    container:{
        width:"100%"
    },
    formcontrol:{
        width:"100%",
        margin: "5px"
    },
    paper:{
        marginTop:"10px",
        width:"100%",
        padding: "10px",
    },
    input:{
        width:"100%",
    }
}));


interface IProps{

}

interface IState{
    title: string;
    content: string;
}

const NewQuestionPage : React.FC<IProps> = (props) => {
    const classes = useStyles();
    const [state, setState] = useState<IState>({title:"", content:""});

    const post = ()=>{
        //Axios.post("/api/questions");
        console.log("CARDACTION HAPPENED");
    }

    const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
        setState({title: event.target.value, content :""});
        console.log(state.title);
    }

    return(
        <Container maxWidth="lg" className={classes.container}>
            <Paper elevation={1} className={classes.paper}>
                <Typography variant="h5">Ask your question here</Typography>
                <FormControl className={classes.formcontrol}>
                    <InputLabel htmlFor="title_input">Title:</InputLabel>
                    <Input 
                        id="title_input" aria-describedby="title-helper" 
                        className={classes.input}
                        onChange={handleChange} />
                    <FormHelperText id="title-helper">A short introduction to your question</FormHelperText>
                </FormControl>
                <FormControl className={classes.formcontrol}>
                    <TextField
                        multiline
                        label={"Content"}
                        rows={10} variant="outlined"
                        id="content_input" aria-describedby="content-helper"
                        className={classes.input}/>
                    <FormHelperText id="content-helper">Write all related information here</FormHelperText>
                </FormControl>
                <Box flex>
                    <Button size="medium" onClick={post}>Post</Button>
                </Box>
            </Paper>
        </Container>
    );
}


export default NewQuestionPage;