import React, { ChangeEvent, useState } from 'react';
import {  Typography, FormControl, InputLabel, Input, FormHelperText, Container, makeStyles, createStyles, Paper, Button, Box, FormLabel, TextField, responsiveFontSizes } from '@material-ui/core';
import Axios from 'axios';
import Question from '../../models/Question'

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


const NewQuestionPage : React.FC<IProps> = (props) => {
    const classes = useStyles();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const post = () => {
        console.log({title: title, content: content})
        Axios.post<Question>("/api/questions",{title: title, content: content})
        .then(resp => console.log(resp))
        .catch(error => console.log(error));
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
                        onChange={e => setTitle(e.target.value)} />
                    <FormHelperText id="title-helper">A short introduction to your question</FormHelperText>
                </FormControl>
                <FormControl className={classes.formcontrol}>
                    <TextField
                        multiline
                        label={"Content"}
                        rows={10} variant="outlined"
                        id="content_input" aria-describedby="content-helper"
                        className={classes.input}
                        onChange={e => setContent(e.target.value)}/>
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