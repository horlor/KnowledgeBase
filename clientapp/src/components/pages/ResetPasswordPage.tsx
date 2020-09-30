import { Avatar, Button, CircularProgress, Container, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { usePasswordResetHook } from '../../hooks/PasswordHooks';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
	paper:{
		display:"flex",
		flexDirection:"column",
		alignItems:"center",
		marginTop: theme.spacing(3),
		padding:theme.spacing(1),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	username:{
		fontStyle:"italic",
	},
	form:{
		display:"flex",
		flexDirection:"column",
		alignItems:"center",
	}
}))

interface IFormState{
	password: string,
	password2: string,
}

const PasswordResetPage : React.FC = () =>{
	const classes = useStyles();
	const {valid, username, resetPassword, error, loading} = usePasswordResetHook();
	const {register, handleSubmit, errors, setError} = useForm();
	const [passwordError, setPasswordError] = useState<string>();

	const onSubmit = async (data: IFormState)=>{
		if(data.password !== data.password2)
			setPasswordError("The two passwords must match.")
		else
			await resetPassword(data.password);
	}

	if(!valid)
		return <Typography>The link you used is unvalid</Typography>;
	return (
	<Container maxWidth="xs">
		<Paper className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography variant="h5">Password reset</Typography>
			<Typography>for <span className={classes.username}>{username}</span></Typography>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<TextField 
				label="New password"
				name="password"
				type="password"
				error={errors?.password}
				helperText={errors.password?"The password must have an upper and a lower case letter and a number, and must be 8 charachters long.":""}
				inputRef={register({pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ })}
				/>
				<TextField
				label="Password again"
				name="password2"
				type="password"
				error={errors?.password2 ||passwordError}
				helperText={errors.password2?"The password must have an upper and a lower case letter and a number, and must be 8 charachters long.":passwordError?passwordError:""}
				inputRef={register({pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ })}
				/>
				{
				loading?<CircularProgress/>:<Button type="submit">Ok</Button>
				}
			</form>
			{
				error?<Typography>{error}</Typography>:""
			}
		</Paper>


	</Container>);

}

export default PasswordResetPage;