import React from 'react';
import {Button, Card, Typography, CardContent, CardActionArea, CardHeader, CardActions, Chip, Box, IconButton} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Question from '../../models/Question';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { dateToString } from '../../helpers/DateHelper';

interface IQuestionProps{
    question: Question;
    delete?: () =>void;
}

const styles = makeStyles(theme =>({
    card:{
        background: "white",
        margin: theme.spacing(1),
    },
    title:{
        display:"inline",
        marginRight: theme.spacing(2),
    },
    remove:{
        marginRight: theme.spacing(2),
    }
}));

const QuestionCard : React.FC<IQuestionProps> = (props) =>{
    const classes = styles();
    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader title={
                <Box>
                    <Typography variant="h5" className={classes.title}>{props.question.title}</Typography>
                    {props.question.topic?<Chip variant="outlined" color="primary" label={props.question.topic.name}/> : ""}
                </Box>
            } 
            subheader={`by ${props.question.author}`}/>
            <CardContent>
                <Typography variant="body1">{`${props.question.content.slice(0,400)}...`}</Typography>
            </CardContent>
            <Box display="flex">
                <Button size="small" component={Link} to={`/questions/${props.question.id}`}>Read</Button>
                <Box flexGrow={11000}/>
                {
                    props.delete?
                    <IconButton size="small" onClick={props.delete} className={classes.remove}>
                        <DeleteIcon/>
                        </IconButton>
                    :""
                }
            </Box>
        </Card>
    );
}

export default QuestionCard;