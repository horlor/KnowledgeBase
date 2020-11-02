import React from 'react';
import { Paper, Typography, makeStyles,  Divider, Chip, Box, IconButton, TextField, Button, Tooltip } from '@material-ui/core';
import Question, { QuestionType, QuestionUpdateRequest } from '../../models/Question';
import EditIcon from '@material-ui/icons/Edit';
import { useQuestionEditHook } from '../../hooks/QuestionHooks';
import { useForm } from 'react-hook-form';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {TextInputDialog} from "../common/TextInputDialog";
import BlockIcon from '@material-ui/icons/Block';
import UserAvatar from '../user/UserAvatar';



interface IProps{
    question: Question
}

const useStyles = makeStyles(theme =>({
    surface:{
        margin:theme.spacing(1),
        padding:theme.spacing(2),
        border: `3px solid ${theme.palette.primary.main}`
    },
    header:{
        width:"100%"
    },
    moderatorPaper:{
        padding: theme.spacing(1),
        border: "gray solid 2px"
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
    const { modifyEnabled, edit, saveChanges, dropChanges, editQuestion, modified,
            hide, close} = useQuestionEditHook(props.question);
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
            <Box display="flex" flexDirection="row" alignItems="center" className={classes.header}>
                <UserAvatar username={props.question.author} size="large"/>
                <Box className={classes.header}>
                    <Box display="flex" flexDirection="row">
                    <Typography variant="h4">{props.question.title}</Typography>
                    <Box flexGrow={1}/>
                    {
                        modifyEnabled?
                            <IconButton onClick={editQuestion}>
                                <EditIcon/>
                            </IconButton>
                        :""
                    }
                    {
                        close.enabled?
                        <>
                        <IconButton onClick={close.openDialog}>
                                {props.question.closed?
                                <LockOpenIcon/>:
                                <LockIcon/>}
                            </IconButton>
                        <TextInputDialog
                            open={close.dialogOpen}
                            title={props.question.closed?"Reopening the question":"Closing the question"}
                            content={props.question.closed?"Enter the message according to the reopen of the question":"Enter the message according to the close of the question"}
                            onOk={close.handleDialog}
                            onCancel={close.closeDialog}
                        />
                        </>:""
                    }
                    {
                        hide.enabled?
                        <>
                        <Tooltip title={hide.isHidden?"Unblock":"Block"}>
                            <IconButton onClick={hide.openDialog}><BlockIcon/></IconButton>
                        </Tooltip> 
                        <TextInputDialog
                            open={hide.dialogOpen}
                            title={hide.isHidden?"Unblocking Question":"Blocking Question"}
                            content={hide.isHidden?"Are you sure you want to unblock this question, after it will reappear to the users?":"Please enter the message according to why you want to block this question."}
                            onOk={hide.handleDialog}
                            onCancel={hide.closeDialog}
                            hideTextField={hide.isHidden}
                        />
                        </>:""
                    }
                    {}
                    </Box>
                    <Box display="flex" flexDirection="row">
                        <Typography variant="subtitle1" >{`by ${props.question.author}`}</Typography>
                        <Chip className={classes.chip} variant="outlined" label={props.question.topic.name}/>
                        <Box flexGrow={1}/>
                        <Typography className={classes.date}>{props.question.created}</Typography>
                    </Box>
                </Box>
            </Box>
            <Divider/>
            <Typography variant="body1" align="justify" className={classes.text}>{props.question.content}</Typography>
            {
                modified?
                <Typography className={classes.modifiedText}>{`The answer was modified at: ${props.question.lastUpdate}`}</Typography>
                :""
            }
            {
                props.question.type === QuestionType.Hidden?
                <Paper className={classes.moderatorPaper}>
                    <Typography variant="caption">{`Hidden by ${props.question.moderator}`}</Typography>
                    <Divider/>
                    <Typography>{props.question.moderatorMessage}</Typography>
                </Paper>
                :""
            }
        </Paper>
    );
}

export default QuestionView;
