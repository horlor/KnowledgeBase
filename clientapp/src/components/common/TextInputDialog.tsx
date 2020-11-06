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
	title: string,
	content: string,
	onOk: (message: string) => void,
	onCancel: ()=> void,
	hideTextField?: boolean,
}

export const  TextInputDialog: React.FC<IProps> = (props: IProps) =>{
	const [text, setText] = useState("");
	const classes = useStyle();
	return (
		<Dialog open={props.open}>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{props.content}</DialogContentText>
				{!props.hideTextField?<TextField
				className={classes.textfield}
					value={text}
					onChange={e => setText(e.target.value)}
				/>:""}
			</DialogContent>
			<DialogActions>
				<Button onClick={()=>props.onOk(text)}>Ok</Button>
				<Button onClick={props.onCancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}