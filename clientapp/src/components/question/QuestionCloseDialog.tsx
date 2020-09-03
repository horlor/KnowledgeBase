import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';

interface IProps{
	open: boolean,
	closing: boolean,
	onOk: (message: string) => void,
	onCancel: ()=> void,
}

export const  QuestionCloseDialog: React.FC<IProps> = (props: IProps) =>{
	const [message, setMessage] = useState("");
	return (
		<Dialog open={props.open}>
			<DialogTitle>{props.closing?"Closing question":"Reopen question"}</DialogTitle>
			<DialogContent>
				<DialogContentText>{props.closing?"Enter the message according to the close of the question":"Enter the message according to the reopen of the question"}</DialogContentText>
				<TextField
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