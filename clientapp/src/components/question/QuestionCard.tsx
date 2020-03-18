import React from 'react';
import {Button, Card, Typography, CardContent, CardActionArea, CardHeader, CardActions, Chip} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Question from '../../models/Question';
import { Link } from 'react-router-dom';

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
    console.log(props.question.topic)
    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader title={props.question.title} subheader={`by ${props.question.author}`}/>
            <CardContent>
                <Typography variant="body1">{`${props.question.content.slice(0,400)}...`}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/questions/${props.question.id}`}>Read</Button>
                {props.question.topic?<Chip label={props.question.topic.name}/> : ""}
            </CardActions>
        </Card>
    );
}

export default QuestionCard;