import { Avatar, makeStyles } from '@material-ui/core';
import React from 'react'
import { GetAvatarPathForUser } from '../../api/UserApi';

interface IProps{
	username: string,
	variant?: "square" | "rounded" | "circle",
	className?: string,
	size?: "small" | "medium" | "large"
}

const useStyles = makeStyles(theme => ({
	small: {
		height: theme.spacing(3),
		width: theme.spacing(3)
	},
	large : {
		height: theme.spacing(8),
		width: theme.spacing(8)
	}
}))

const UserAvatar = ({username, variant = "circle", className="", size="medium"}: IProps)=>{
	const classes = useStyles();
	return (
	<Avatar 
		src={GetAvatarPathForUser(username)}
		variant={variant}
		className={`${size == "small"?classes.small:size == "large"?classes.large:""} ${className}`}
	>
	{username.toUpperCase().slice(0, 1)}
	</Avatar>);
}


export default UserAvatar;