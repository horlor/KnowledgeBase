import { createReducer, createAction } from "@reduxjs/toolkit";
import { User, UserDetailed, UserSearchResponse } from "../../models/User";
import ErrorModel from "../../models/ErrorModel";

export interface IUserState{
    users: User[],
    page: number,
    pageCount: number,
    loading: boolean,
    error: ErrorModel | undefined,
    selectedUser: UserDetailed | undefined,
    selectedLoading: boolean,
    selectedError: ErrorModel | undefined,
}

const initialState : IUserState =  {
    users: [],
    page: 1,
    pageCount:0,
    loading: false,
    error: undefined,
    selectedUser: undefined,
    selectedLoading : false,
    selectedError : undefined,
}

export const FetchUsersStarted = createAction("fetch-users-started");
export const FetchUsersSuccess = createAction<UserSearchResponse>("fetch-users-success");
export const FetchUsersFailure = createAction<ErrorModel>("fetch-users-fail");
export const FetchSelectedUserStarted = createAction("fetch-selectedUser-started");
export const FetchSelectedUserSuccess = createAction<UserDetailed>("fetch-selectedUser-success");
export const FetchSelectedUserFailure = createAction<ErrorModel>("fetch-selectedUser-failure");



export const UserReducer = createReducer(initialState, builder => builder
    .addCase(FetchUsersStarted, (state, action)=>{
        state.loading = true;
    })
    .addCase(FetchUsersSuccess, (state, action)=>{
        state.loading =false;
        state.users = action.payload.users;
        state.page = action.payload.page;
        state.pageCount = action.payload.pageCount
    })
    .addCase(FetchUsersFailure, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(FetchSelectedUserStarted, (state, action)=>{
        state.selectedLoading = true;
        state.selectedUser = undefined;
        state.selectedError = undefined;
    })
    .addCase(FetchSelectedUserSuccess, (state,action)=>{
        state.selectedLoading = false;
        state.selectedUser = action.payload;
    })
    .addCase(FetchSelectedUserFailure, (state, action) =>{
        state.selectedLoading = false;
        state.selectedError = action.payload;
    })
    
);