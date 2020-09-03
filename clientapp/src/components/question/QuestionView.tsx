import React from 'react';
import { Paper, Typography, makeStyles,  Divider, Chip, Box, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Question, { QuestionUpdateRequest } from '../../models/Question';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import { useQuestionEditHook } from '../../hooks/QuestionHooks';
import { register } from '../../serviceWorker';
import { useForm } from 'react-hook-form';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { QuestionCloseDialog } from './QuestionCloseDialog';



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
    },
    textbox:{
        width:"100%",
        marginTop: theme.spacing(1)
    },
    text:{
        //whitespaces
        whiteSpace:"pre-wrap"
    },
    date:{
        fontStyle:"italic"
    },
    modifiedText:{
        fontStyle:"italic",
        fontSize: "0.7rem"
    }
}));

const QuestionView : React.FC<IProps> = props=>{
    const { modifyEnabled, edit, saveChanges, dropChanges, editQuestion, modified, closeState} = useQuestionEditHook(props.question);
    const classes = useStyles();
    const {register, handleSubmit} =useForm<QuestionUpdateRequest>();
    if(edit)
        return (
        <Paper className={classes.surface} variant="outlined">
            <Typography variant="h4">{props.question.title}</Typography>
            <Divider/>
            <form onSubmit={handleSubmit(saveChanges)}>
            <TextField
                className={classes.textbox}
                variant="outlined" 
                multiline
                rows={5}
                name="content"
                defaultValue={props.question.content}
                inputRef={register}
            />
            <Box display="flex" flexDirection="row">
                <Button type="submit">Save</Button>
                <Button onClick={dropChanges}>Cancel</Button>
            </Box>
            </form>
        </Paper>
        );
    return(
        <Paper className={classes.surface} variant="outlined">
            <Box display="flex" flexDirection="row">
                <Typography variant="h4">{props.question.title}</Typography>
                <Box flexGrow={1}/>
                {
                    modifyEnabled?
                    <>
                        <IconButton onClick={editQuestion}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={closeState.openDialog}>
                            {props.question.closed?
                            <LockOpenIcon/>:
                            <LockIcon/>}
                        </IconButton>
                        <QuestionCloseDialog
                            onOk={closeState.closeQuestion}
                            onCancel={closeState.closeDialog}
                            closing={!props.question.closed}
                            open={closeState.dialogOpen}
                        />
                    </>
                    :""
                }
            </Box>
            <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1" >{`by ${props.question.author}`}</Typography>
                <Chip className={classes.chip} variant="outlined" label={props.question.topic.name}/>
                <Box flexGrow={1}/>
                <Typography className={classes.date}>{props.question.created}</Typography>
            </Box>
            <Divider/>
            <Typography variant="body1" align="justify" className={classes.text}>{props.question.content}</Typography>
            {
                modified?
                <Typography className={classes.modifiedText}>{`The answer was modified at: ${props.question.lastUpdate}`}</Typography>
                :""
            }
        </Paper>
    );
}

export default QuestionView;
