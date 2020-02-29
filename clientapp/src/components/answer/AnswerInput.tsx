import React from 'react';
import {useState} from 'react';
import { TextField, Card, Typography, Button, makeStyles } from '@material-ui/core';
import Axios from 'axios';

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

    const post = () =>{
        Axios.post(`/api/questions/${props.questionId}/answers`,{content:content})
        .then(resp =>{;}) //TODO success and error checking
        .catch(err => {});
        //reload the page to see the new answer after posting somehow
    }

    return (
        <Card className={classes.surface}>
            <Typography variant="h6">Your Answer</Typography>
            <TextField multiline rows={5}
             className={classes.textfield} variant="outlined"
             onChange={(e)=>setContent(e.target.value)}
             />
            <Button size='medium' onClick={post}>Post</Button>
        </Card>
    );
}

export default AnswerInput;