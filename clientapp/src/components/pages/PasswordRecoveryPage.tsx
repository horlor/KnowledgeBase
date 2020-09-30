import { Avatar, Button, CircularProgress, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { usePasswordRecoveryHook } from '../../hooks/PasswordHooks';

const useStyles = makeStyles(theme => ({
	root:{
		marginTop: theme.spacing(3),
		display:"flex",
		flexDirection:"column",
		alignItems:"center",
		minHeight:"30vh"
	},
	field:{
		width:`calc(100%-${theme.spacing(1)}px)`,
		margin:theme.spacing(1)
	},  
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},

}))

const PasswordRecoveryPage : React.FC = () =>{
	const [username, setUsername] = useState("")
	const classes = useStyles();
	const {passwordRecovery, success, error, loading} = usePasswordRecoveryHook();
	return (
	<Container maxWidth="xs">
		<Paper  className={classes.root}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography variant="h5">Password recovery</Typography>
			<TextField
			className={classes.field}
			variant="outlined"
			label="Username"
			value={username}
			onChange={e => setUsername(e.target.value)}
			/>
			{
				loading?<CircularProgress/>:<Button onClick={()=>passwordRecovery(username)}>Send me the recovery email</Button>
			}
			{
				error?<Typography>{error}</Typography>:success?<Typography>We have sent the email, you can setup a new password by clicking on the link in it.</Typography>:""
			}
		</Paper>


	</Container>);

}

export default PasswordRecoveryPage;