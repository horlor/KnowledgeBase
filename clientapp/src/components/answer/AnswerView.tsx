import React from 'react';
import { Typography, Card, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles({
    card:{
        background: "white",
        margin: "5px",
        padding: "20px"
    },
    authorText:{
        fontStyle:"italic"
    }
})


interface IProps{
    content: string,
    author: string,
}

const AnswerView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <Typography>
                {props.content}
            </Typography>
            <Typography align="right" className={classes.authorText}>{`by ${props.author}`}</Typography>
        </Paper>
    );
}

export default AnswerView;