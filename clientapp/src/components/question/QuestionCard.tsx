import React from 'react';
import {Button, Card, Typography, CardContent, Chip, Box, IconButton, CardHeader} from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';
import Question, { QuestionType } from '../../models/Question';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import UserAvatar from '../user/UserAvatar';

interface IQuestionProps{
    question: Question;
    delete?: () =>void;
}

const styles = makeStyles(theme =>({
    card:{
        margin: theme.spacing(1),
    },
    hidden:{
        border: "gray solid 2px"
    },
    title:{
        marginRight: theme.spacing(2),
    },
    remove:{
        marginRight: theme.spacing(2),
    }
}));

const QuestionCard : React.FC<IQuestionProps> = (props) =>{
    const classes = styles();
    return (
        <Card variant="outlined" className={props.question.type === QuestionType.Hidden?`${classes.card} ${classes.hidden}`:classes.card} >
            <CardHeader title={
                <Box display="flex" flexDirection="row">
                    <Typography variant="h5" className={classes.title}>{props.question.title}</Typography>
                    {props.question.topic?<Chip variant="outlined" color="primary" label={props.question.topic.name}/> : ""}
                    <Box flexGrow={1}/>
                    {props.question.type === QuestionType.Hidden?<Typography variant="subtitle1">hidden by moderator</Typography>:"" }
                </Box>
            } 
            subheader={`by ${props.question.author}`}
            avatar={<UserAvatar username={props.question.author}/>}
            />
            <CardContent>
                <Typography variant="body1">{`${props.question.content.slice(0,400)}${props.question.content.length>400?"...":""}`}</Typography>
            </CardContent>
            <Box display="flex">
                <Button size="small" component={Link} to={`/questions/${props.question.id}`}>Read</Button>
                <Box flexGrow={1}/>
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