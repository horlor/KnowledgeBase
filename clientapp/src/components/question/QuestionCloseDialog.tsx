import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme=>({
	textfield:{
		width:"100%"
	}
}))

interface IProps{
	open: boolean,
	closing: boolean,
	onOk: (message: string) => void,
	onCancel: ()=> void,
}

export const  QuestionCloseDialog: React.FC<IProps> = (props: IProps) =>{
	const [message, setMessage] = useState("");
	const classes = useStyle();
	return (
		<Dialog open={props.open}>
			<DialogTitle>{props.closing?"Closing question":"Reopen question"}</DialogTitle>
			<DialogContent>
				<DialogContentText>{props.closing?"Enter the message according to the close of the question":"Enter the message according to the reopen of the question"}</DialogContentText>
				<TextField
				className={classes.textfield}
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={()=>props.onOk(message)}>Ok</Button>
				<Button onClick={props.onCancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}