import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { useTheme } from '../../hooks/ThemeHooks';

interface IProps{

}


const ThemeProvider : React.FC<IProps> = (props) =>{
	const {theme} = useTheme();

	return(
		<MuiThemeProvider theme={theme} >
			{props.children}
		</MuiThemeProvider>
	)
}

export default ThemeProvider;