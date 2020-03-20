import { createReducer, createAction } from "@reduxjs/toolkit";
import { UserDetailed } from "../../models/User";
import ErrorModel from "../../models/ErrorModel";

export interface ILoginStore{
    loggedIn : boolean,
    username?: string,
}

export const LoginAction = createAction<string>("user-login");
export const LogoutAction = createAction("user-logout");

const initialstate : ILoginStore = {
    loggedIn:false,
    username: undefined,
}

//The reducer - using builder to provide type checking
//Notice that thanks to Immer the created function is pure, regardless the changes on the state object
export const LoginReducer = createReducer(initialstate, builder => builder
    .addCase(LoginAction, (state, action) =>{
        state.loggedIn = true;
        state.username = action.payload;
    })
    .addCase(LogoutAction, (state, action) =>{
        state.loggedIn = false;
        state.username = undefined;
    })
);
