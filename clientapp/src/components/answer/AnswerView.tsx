import React from 'react';
import { Typography, Card, makeStyles, Paper, Box, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    card:{
        background: "white",
        margin: "5px",
        padding: "20px"
    },
    authorText:{
        fontStyle:"italic"
    },
    iconbutton:{
        padding:"0px"
    }
})


interface IProps{
    content: string,
    author: string,
    delete: (()=>void) | undefined,
}

const AnswerView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <Typography>
                {props.content}
            </Typography>
            <Box display="flex" flexDirection="row-reverse">
                <Typography align="right" className={classes.authorText}>{`by ${props.author}`}</Typography>
                {
                    props.delete?
                    <IconButton className={classes.iconbutton} onClick={props.delete}>
                    <DeleteIcon/>
                    </IconButton>
                    :""
                }
            </Box>
            
        </Paper>
    );
}

export default AnswerView;