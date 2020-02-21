import React from 'react';
import {Button, Card, Typography, CardContent, CardActions, CardHeader} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface IQuestionProps{
    title: string;
    content : string;
    author?: string;
}

const styles = makeStyles({
    card:{
        background: "white",
        margin: "5px"
    }
})

const QuestionView : React.FC<IQuestionProps> = (props) =>{
    const classes = styles();
    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader title={props.title}/>
            <CardContent>
                <Typography variant="body1">{props.content}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={`/questions/1`}>Read</Button>
            </CardActions>
        </Card>
    );
}

export default QuestionView;