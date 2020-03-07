import React from 'react';
import {useState} from 'react';
import { TextField, Card, Typography, Button, makeStyles, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import { useAnswerInputHook } from '../../hooks/AnswerHooks';

const useStyles = makeStyles({
    textfield: {
        width:"100%",
        padding: "5px",
    },
    surface:{
        margin: "5px",
        padding: "5px",
    }
});

interface IProps{
    questionId: number;
}



const AnswerInput : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    const [content, setContent] = useState<string>();
    const {loggedIn, user, error, loading, postAnswer} = useAnswerInputHook(props.questionId);

    if(!loggedIn)
        return (
        <Card className={classes.surface}>
            <Typography variant="h6">Please login or register to post an answer</Typography>
        </Card>);
    return (
        <Card className={classes.surface}>
            <Typography variant="h6">Your Answer</Typography>
            <TextField multiline rows={5}
             className={classes.textfield} variant="outlined"
             onChange={(e)=>setContent(e.target.value)}
             />
             {loading?
             <CircularProgress/>:
            <Button size='medium' onClick={()=>{if(content) postAnswer(content)}}>Post</Button>}
        </Card>
    );
}

export default AnswerInput;