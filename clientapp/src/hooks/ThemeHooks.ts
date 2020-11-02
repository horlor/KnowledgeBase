import { createMuiTheme } from "@material-ui/core"
import * as createPalette from "@material-ui/core/styles/createPalette";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwitchThemeAction } from "../redux/reducers/ThemeReducer";
import { RootState } from "../redux/Store";


declare module "@material-ui/core/styles/createPalette" {
	interface Palette {
	  greyedOut: Palette['background'];
	}
	interface PaletteOptions {
		greyedOut: PaletteOptions['background'];
	}
  }


export const useTheme = ()=>{
	const darkMode = useSelector((state: RootState)=> state.theme.isDarkMode);
	const dispatch = useDispatch();
	useEffect(()=>{
		const themeStr  = localStorage.getItem("theme");
		if(themeStr === "dark")
			dispatch(SwitchThemeAction(true))
	},[dispatch])

	const darkTheme = createMuiTheme({
		palette:{
		  	type:"dark",

		  	greyedOut:{
				paper: "#222222"
		  	}
		},
		overrides:{
			MuiChip:{
				outlinedPrimary:{
					color: "#9999ff",
					borderColor: "#aaaaff"
				}
			}
		}
		
	});
	
	const lightTheme = createMuiTheme({
		palette:{
		  type:"light",

		  greyedOut:{
			  paper: "gainsboro"
		  }
		}
	});

	const theme = darkMode ? darkTheme : lightTheme;
	 
	const switchTheme = ()=>{
		dispatch(SwitchThemeAction(!darkMode))
		localStorage.setItem("theme",darkMode?"light":"dark")
	}

	return {theme, darkMode, switchTheme}
}