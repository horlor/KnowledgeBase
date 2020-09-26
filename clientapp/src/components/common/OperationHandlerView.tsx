import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';
import { useOperationHook } from '../../hooks/MenuHooks';

interface IProps{
	className?: string
}

export const OperationHandlerView:React.FC<IProps> = (props: IProps) => {
	const {error, message, isBusy, CancelError} = useOperationHook();
	if(error)
		return (
		<Dialog open={!!error}>
			<DialogTitle>{error.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{error.description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={CancelError}>Ok</Button>
			</DialogActions>
		</Dialog>);
	return (
		<Backdrop open={isBusy} className={props.className}>
			<Typography>{message}</Typography>
			<CircularProgress></CircularProgress>
		</Backdrop>
	);
}

export default OperationHandlerView;