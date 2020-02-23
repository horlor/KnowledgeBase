import React from 'react';
import { Paper, Typography, makeStyles, createStyles } from '@material-ui/core';
import Question from './Question';

interface IProps{
    question: Question
}

const useStyles = makeStyles(theme =>({
    surface:{
        margin:"5px",
        padding:"20px",
        border: `3px solid ${theme.palette.primary.main}`
    }
}));

const QuestionView : React.FC<IProps> = props=>{
    const classes = useStyles();
    return(
        <Paper className={classes.surface} variant="outlined">
            <Typography variant="h4">{props.question.title}</Typography>
            <Typography variant="body2" align="justify">{props.question.content}</Typography>
        </Paper>
    );
}

export default QuestionView;
