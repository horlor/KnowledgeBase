import { Avatar } from '@material-ui/core';
import React from 'react'
import { GetAvatarPathForUser } from '../../api/UserApi';

interface IProps{
	username: string,
	variant?: "square" | "rounded" | "circle",
	className?: string
}

const UserAvatar = ({username, variant = "circle", className=""}: IProps)=>{

	return (
	<Avatar 
		src={GetAvatarPathForUser(username)}
		variant={variant}
		className={className}
	>
	{username.toUpperCase().slice(0, 1)}
	</Avatar>);
}


export default UserAvatar;