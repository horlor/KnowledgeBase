import { createReducer, createAction } from "@reduxjs/toolkit";
import { User, UserDetailed } from "../../models/User";
import ErrorModel from "../../models/ErrorModel";

export interface IUserState{
    users: User[],
    loading: boolean,
    error: ErrorModel | undefined,
    selectedUser: UserDetailed | undefined,
    selectedLoading: boolean,
    selectedError: ErrorModel | undefined,
    profile: {
        user: UserDetailed | undefined,
        loading: boolean,
        error: ErrorModel |undefined,
    }
}

const initialState : IUserState =  {
    users: [],
    loading: false,
    error: undefined,
    selectedUser: undefined,
    selectedLoading : false,
    selectedError : undefined,
    profile : {
        user: undefined,
        loading: false,
        error: undefined,
    }
}

export const FetchUsersStarted = createAction("fetch-users-started");
export const FetchUsersSuccess = createAction<User[]>("fetch-users-success");
export const FetchUsersFailure = createAction<ErrorModel>("fetch-users-fail");
export const FetchSelectedUserStarted = createAction("fetch-selectedUser-started");
export const FetchSelectedUserSuccess = createAction<UserDetailed>("fetch-selectedUser-success");
export const FetchSelectedUserFailure = createAction<ErrorModel>("fetch-selectedUser-failure");
export const FetchProfileStarted = createAction("fetch-profile-started");
export const FetchProfileSuccess = createAction<UserDetailed>("fetch-profile-success");
export const FetchProfileFailure = createAction<ErrorModel>("fetch-profile-failure");

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
    .addCase(FetchProfileStarted, (state, action) =>{
        state.profile.error = undefined;
        state.profile.user = undefined;
        state.profile.loading = true;
    })
    .addCase(FetchProfileSuccess, (state, action)=>{
        state.profile.user = action.payload;
        state.profile.loading  = false;
    })
    .addCase(FetchProfileFailure, (state, action)=>{
        state.profile.loading  = false;
        state.profile.error = action.payload;
    })
    
);