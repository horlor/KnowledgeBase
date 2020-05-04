import React from 'react';
import { Typography, makeStyles, Paper, Box, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Answer, { AnswerUpdateRequest } from '../../models/Answer';
import { useAnswerHook } from '../../hooks/AnswerHooks';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
    card:{
        background: "white",
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    authorText:{
        fontStyle:"italic",
        marginRight: theme.spacing(1)
    },
    iconbutton:{
        padding:"0px"
    },
    textbox:{
        width:"100%",
    },
    datetext:{
        fontStyle:"italic",
    },
    modifiedText:{
        fontStyle:"italic",
        fontSize: "0.7rem"
    },
    content:{
        whiteSpace:"pre-wrap"
    }
}))


interface IProps{
    answer: Answer,
}

const AnswerView : React.FC<IProps> = (props) =>{
    const {edit, saveChanges, dropChanges, editAnswer, deleteWithDialog, acceptDelete, dropDelete, deleteDialog, modifyEnabled, modified} = useAnswerHook(props.answer);
    const classes = useStyles();
    const {register, handleSubmit} = useForm<AnswerUpdateRequest>();
    if(edit){
        return (
        <Paper className={classes.card}>
            <form onSubmit={handleSubmit(saveChanges)}>
            <TextField
                className={classes.textbox}
                variant="outlined" 
                multiline
                rows={5}
                name="content"
                defaultValue={props.answer.content}
                inputRef={register}
            />
            <Box display="flex" flexDirection="row">
                <Button type="submit">Save</Button>
                <Button onClick={dropChanges}>Cancel</Button>
            </Box>
            </form>
        </Paper>
        );
    }
    return (
        <>
        <Paper className={classes.card}>
        <Box display="flex" flexDirection="row">
            <Typography className={classes.authorText}>{`by ${props.answer.author}`}</Typography>
            <Box flexGrow={1} />
            {
                    modifyEnabled?
                    <>
                        <IconButton className={classes.iconbutton} onClick={deleteWithDialog}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton className={classes.iconbutton} onClick={editAnswer}>
                            <EditIcon/>
                        </IconButton>
                    </>
                    :
                    ""
                }
            <Typography className={classes.datetext}>{props.answer.created}</Typography>
            </Box>
            <Divider/>
            <Typography className={classes.content}>
                {props.answer.content}
            </Typography>
            {
                modified?
                <Typography className={classes.modifiedText}>{`The answer was modified at: ${props.answer.lastUpdate}`}</Typography>
                :""
            }
        </Paper>
        <Dialog open={deleteDialog}>
                    <DialogTitle>Warning!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{`Are you sure to delete the following answer: ${props.answer.content.slice(0,50)}...?`}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={acceptDelete}>Ok</Button>
                        <Button onClick={dropDelete}>Cancel</Button>
                    </DialogActions>
                </Dialog>
        </>
    );
}

export default AnswerView;