import { IconButton } from '@material-ui/core';
import React from 'react';
import { useTheme } from '../../hooks/ThemeHooks';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const SwitchThemeButton: React.FC = ()=>{
	const {switchTheme} = useTheme();

	return (
		<IconButton onClick={switchTheme}>
			<Brightness4Icon/>
		</IconButton>
	);
}

export default SwitchThemeButton;