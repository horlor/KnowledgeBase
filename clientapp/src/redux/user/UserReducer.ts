import { createReducer, createAction } from "@reduxjs/toolkit";

export interface IUserStore{
    loggedIn : boolean,
    username?: string
}

export const UserLoginAction = createAction<string>("user-login");
export const UserLogoutAction = createAction("user-logout");

const initialstate : IUserStore = {
    loggedIn:false,
    username: undefined,
}

//The reducer - using builder to provide type checking
//Notice that thanks to Immer the created function is pure, regardless the changes on the state object
export const UserReducer = createReducer(initialstate, builder => builder
    .addCase(UserLoginAction, (state, action) =>{
        state.loggedIn = true;
        state.username = action.payload;
    })
    .addCase(UserLogoutAction, (state, action) =>{
        state.loggedIn = false;
        state.username = undefined;
    })
);
