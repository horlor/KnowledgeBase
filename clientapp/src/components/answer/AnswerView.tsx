import React from 'react';
import { Typography, makeStyles, Paper, Box, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Answer, { AnswerUpdateRequest, AnswerType } from '../../models/Answer';
import { useAnswerHook } from '../../hooks/AnswerHooks';
import { useForm } from 'react-hook-form';
import { TextInputDialog } from '../common/TextInputDialog';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles(theme => ({
    card:{
        background: "white",
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    hiddenCard:{
        background: "gainsboro"
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
    },
    moderatorText:{
        textAlign: "center"
    }
}))


interface IProps{
    answer: Answer,
}

const AnswerView : React.FC<IProps> = (props) =>{
    const {
        edit, saveChanges, dropChanges, editAnswer, deleteWithDialog,
         acceptDelete, dropDelete, deleteDialog, modifyEnabled, modified, hide} 
         = useAnswerHook(props.answer);
    const classes = useStyles();
    const {register, handleSubmit} = useForm<AnswerUpdateRequest>();
    if(edit){
        return (
        <Paper className={`${classes.card} ${hide.isHidden?classes.hiddenCard:""}`}>
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
    const getUserVerb = (type?: AnswerType)=>{
        switch(type){
            case AnswerType.Reopener: return "Reopened ";
            case AnswerType.Closer: return "Closed ";
            case AnswerType.Deleted: return "Deleted ";
            default: return "";
        }
    }


    return (
        <Paper className={`${classes.card} ${hide.isHidden?classes.hiddenCard:""}`}>
        <Box display="flex" flexDirection="row">
            <Typography className={classes.authorText}>
                {`${getUserVerb(props.answer.type)}by ${props.answer.author}`}</Typography>
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
                    :
                    ""
                }
                {
                    hide.enabled?
                    <>
                    <Tooltip title={hide.isHidden?"Unblock":"Block"}>
                        <IconButton className={classes.iconbutton} onClick={hide.openDialog}><BlockIcon/></IconButton>
                    </Tooltip>
                    <TextInputDialog
                        open={hide.dialogOpen}
                        title={hide.isHidden?"Unblocking answer":"Blocking answer"}
                        content={hide.isHidden?"Are you sure you want to unblock this answer, after it will reappear to the users.":"Please enter the message according to why you want to block this answer."}
                        onOk={hide.handleDialog}
                        onCancel={hide.closeDialog}
                        hideTextField={hide.isHidden}
                    />
                    </>:""
                }
            <Typography className={classes.datetext}>{props.answer.created}</Typography>
        </Box>
        <Divider/>
        <Typography className={classes.content}>{props.answer.content}</Typography>
        {
        hide.cardShown?
        <Paper>
            <Typography variant="caption">{`Hidden by ${props.answer.moderator}`}</Typography>
            <Divider/>
            <Typography>{props.answer.moderatorMessage}</Typography>
        </Paper>:""
        }
        <Box display="flex">
        {
            modified?
            <Typography className={classes.modifiedText}>{`The answer was modified at: ${props.answer.lastUpdate}`}</Typography>
            :""
        }
            <Box flexGrow={1}/>
            {   props.answer.type === AnswerType.HiddenByModerator?
            <Typography className={classes.moderatorText} variant="caption">Hidden by moderator</Typography>:""}
        </Box>
        </Paper>
    );
}

export default AnswerView;