import React from 'react';
import { Paper, Typography, makeStyles, createStyles, Divider, Chip, Box } from '@material-ui/core';
import Question from '../../models/Question';

interface IProps{
    question: Question
}

const useStyles = makeStyles(theme =>({
    surface:{
        margin:theme.spacing(1),
        padding:theme.spacing(2),
        border: `3px solid ${theme.palette.primary.main}`
    },
    chip:{
        marginLeft: theme.spacing(1),
        marginBottom: "2px",
    }
}));

const QuestionView : React.FC<IProps> = props=>{
    const classes = useStyles();
    return(
        <Paper className={classes.surface} variant="outlined">
            <Typography variant="h4">{props.question.title}</Typography>
            <Typography display="inline" variant="subtitle1" >{`by ${props.question.author}`}</Typography>
            <Chip className={classes.chip} variant="outlined" label={props.question.topic.name}/>
            <Divider/>
            <Typography variant="body1" align="justify">{props.question.content}</Typography>
        </Paper>
    );
}

export default QuestionView;
