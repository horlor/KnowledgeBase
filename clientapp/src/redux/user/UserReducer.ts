import { createReducer, createAction } from "@reduxjs/toolkit";

export interface IUserStore{
    loggedIn : boolean,
    token?: string,
}

export const UserLoginAction = createAction<string>("user-login");
export const UserLogoutAction = createAction("user-logout");

const initialstate : IUserStore = {
    loggedIn:false,
    token:undefined    
}

export const UserReducer = createReducer(initialstate, builder => builder
    .addCase(UserLoginAction, (state, action) =>{
        state.loggedIn = true;
        state.token = action.payload;
    })
    .addCase(UserLogoutAction, (state, action) =>{
        state.loggedIn = false;
        state.token = undefined;
    })
);
