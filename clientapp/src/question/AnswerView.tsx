import React from 'react';
import { Typography, Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    card:{
        background: "white",
        margin: "5px",
        padding: "20px"
    }
})


interface IProps{
    content: string
}

const AnswerView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography>
                {props.content}
            </Typography>
        </Card>
    );
}

export default AnswerView;