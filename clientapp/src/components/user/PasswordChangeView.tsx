import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react'
import { useForm } from 'react-hook-form';
import { usePasswordChangeHook } from '../../hooks/PasswordHooks';


const useStyles = makeStyles(theme => ({
	textfield:{
		width: "100%"
	},
	item:{
		padding:theme.spacing(1)
	}
}));
interface IProps{

}

interface IFormData{
	oldPassword: string,
	newPassword1: string,
	newPassword2: string,
}
const PasswordChangeView = (props: IProps)=>{
	const classes = useStyles()
	const {changePassword} = usePasswordChangeHook();
	const {register, handleSubmit, errors, watch} = useForm<IFormData>({mode:"onBlur"});

	async function onSubmit(data: IFormData){
		await changePassword(data.oldPassword, data.newPassword1)
	}

	const password2Error = watch("newPassword1") !== watch("newPassword2")

	return(
		<form onSubmit={handleSubmit(onSubmit)}>
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h6">Change your password</Typography>
			</Grid>
			<Grid item xs={12} lg={3} className={classes.item}>
				<TextField 
					name="oldPassword"
					label="Old password"
					type="password"
					className={classes.textfield}
					inputRef={register}
				/>
			</Grid>
			<Grid item xs={12} lg={3} className={classes.item}>
				<TextField 
					name="newPassword1"
					label="New password"
					type="password"
					className={classes.textfield}
					error={!!errors.newPassword1}
					helperText={errors.newPassword1?"The password must contain at least an upper and a lower case character and a number and be 8 character long.":""}
					inputRef={register({pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ })}
				/>
			</Grid>
			<Grid item xs={12} lg={3} className={classes.item}>
				<TextField 
					name="newPassword2"
					label="New password again"
					type="password"
					className={classes.textfield}
					error={password2Error}
					helperText={password2Error?"The two passwords do not match":""}
					inputRef={register({pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ })}
				/>
			</Grid>
			<Grid item xs={12} lg={3} className={classes.item}>
				<Button variant="contained" type="submit">Change password</Button>
			</Grid>
		</Grid>
		</form>
	);
}

export default PasswordChangeView;