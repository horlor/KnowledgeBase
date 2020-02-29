import React from 'react';
import {Button, Card, Typography, CardContent, CardActionArea, CardHeader, CardActions} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Question from '../../models/Question';

interface IQuestionProps{
    question: Question;
}

const styles = makeStyles({
    card:{
        background: "white",
        margin: "5px"
    }
})

const QuestionCard : React.FC<IQuestionProps> = (props) =>{
    const classes = styles();
    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader title={props.question.title}/>
            <CardContent>
                <Typography variant="body1">{props.question.content}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={`/questions/${props.question.id}`}>Read</Button>
            </CardActions>
        </Card>
    );
}

export default QuestionCard;