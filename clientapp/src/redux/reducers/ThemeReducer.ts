import { createAction, createReducer } from "@reduxjs/toolkit";

interface IThemeState{
	isDarkMode: boolean
}

export const SwitchThemeAction = createAction<boolean>("switch-theme");

export const ThemeReducer = createReducer({isDarkMode: false},builder => builder
	.addCase(SwitchThemeAction, (state, action)=>{
		state.isDarkMode = action.payload;
	})	
);