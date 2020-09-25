import React, { ChangeEvent, useState } from 'react';
import {  Typography, FormControl, InputLabel, Input, FormHelperText, Container, makeStyles, createStyles, Paper, Button, Box, FormLabel, TextField, CircularProgress, Select } from '@material-ui/core';
import Axios from 'axios';
import Question from '../../models/Question'
import { useForm } from 'react-hook-form';
import { useNewQuestionHook } from '../../hooks/QuestionHooks';
import { Topic } from '../../models/Topic';
import NotLoggedInView from '../common/NotLoggedInView';

const useStyles = makeStyles(theme => createStyles({
    container:{
        width:"100%"
    },
    formcontrol:{
        width:"100%",
        margin: theme.spacing(1)
    },
    paper:{
        marginTop:theme.spacing(2),
        width:"100%",
        padding: theme.spacing(2),
    },
    input:{
        width:"100%",
    },
    topicSelect:{
        width:"240px",
        marginLeft: theme.spacing(2)
    },
}));


interface IProps{

}

interface IFormData{
    content: string,
    title: string,
    topic: number
}


const NewQuestionPage : React.FC<IProps> = (props) => {
    const classes = useStyles();
    const {register, handleSubmit} = useForm<IFormData>({mode:"onBlur"});
    const {topics, loggedIn, post, postLoading, postError} = useNewQuestionHook();

    const onSubmit = (data: IFormData) => {
        //Cannot get Array.find to correctly use types
        // eslint-disable-next-line eqeqeq
        let topic = topics?.find(t => t.id == data.topic);
        if(topic !== undefined)
            post(data.title, data.content, topic);
    }
    if(!loggedIn)
        return <NotLoggedInView/>
    return(
        <Container maxWidth="lg" className={classes.container}>
            <Paper elevation={1} className={classes.paper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h5">Ask your question here</Typography>
                    <FormControl className={classes.formcontrol}>
                        <InputLabel htmlFor="title_input">Title:</InputLabel>
                        <Input 
                            id="title_input" aria-describedby="title-helper" 
                            name="title"
                            className={classes.input}
                            inputRef={register} />
                        <FormHelperText id="title-helper">A short introduction to your question</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formcontrol}>
                        <TextField
                            multiline
                            label={"Content"}
                            rows={10} variant="outlined"
                            id="content_input" aria-describedby="content-helper"
                            className={classes.input}
                            name="content"
                            inputRef={register}/>
                        <FormHelperText id="content-helper">Write all related information here</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography >Topic: </Typography>
                        <Select
                            id="topic-native-select"
                            inputRef={register}
                            native
                            label="Topic"
                            className={classes.topicSelect}
                            name="topic"
                        >
                            {topics?.map(topic => <option key={topic.id} value={topic.id}>{topic.name}</option>)}
                        </Select>
                    </Box>
                    </FormControl>
                    
                    <Box display="flex">
                        {postLoading?<CircularProgress/>:(
                            (postError=== undefined)?
                        <Button type="submit" size="medium">Post</Button>
                        :
                        <Typography color="error">{postError.title}</Typography>)
                        }
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}


export default NewQuestionPage;