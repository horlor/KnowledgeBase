import { createReducer, createAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import ErrorModel from "../../models/ErrorModel";

export interface IUserState{
    users: User[],
    loading: boolean,
    error: ErrorModel | undefined,
}

const initialState : IUserState =  {
    users: [],
    loading: false,
    error: undefined,
}

export const FetchUsersStarted = createAction("fetch-users-started");
export const FetchUsersSuccess = createAction<User[]>("fetch-users-success");
export const FetchUsersFailure = createAction<ErrorModel>("fetch-users-fail");

export const UserReducer = createReducer(initialState, builder => builder
    .addCase(FetchUsersStarted, (state, action)=>{
        state.loading = true;
    })
    .addCase(FetchUsersSuccess, (state, action)=>{
        state.loading =false;
        state.users = action.payload;
    })
    .addCase(FetchUsersFailure, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    
);