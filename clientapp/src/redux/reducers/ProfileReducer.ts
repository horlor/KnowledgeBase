import { createReducer, createAction } from "@reduxjs/toolkit";
import { User, UserDetailed } from "../../models/User";
import ErrorModel from "../../models/ErrorModel";

interface IProfileState{
    user: UserDetailed | undefined,
    loading: boolean,
    error: ErrorModel |undefined,
    edit: boolean,
    saveLoading: boolean,
    saveError: ErrorModel |undefined,
}

const initialState : IProfileState  = {
    user: undefined,
    loading: false,
    error: undefined,
    edit: false,
    saveLoading: false,
    saveError: undefined,
}

export const FetchProfileStarted = createAction("fetch-profile-started");
export const FetchProfileSuccess = createAction<UserDetailed>("fetch-profile-success");
export const FetchProfileFailure = createAction<ErrorModel>("fetch-profile-failure");
export const ChangeProfileEdit = createAction<boolean>("change-profile-edit");
export const PutProfileStarted = createAction("put-profile-started");
export const PutProfileSuccess = createAction("put-profile-success");
export const PutProfileFailure = createAction<ErrorModel>("put-profile-failure");
export const PutProfileErrorClose = createAction("put-profile-error-close");

export const ProfileReducer = createReducer(initialState, builder => builder
    .addCase(FetchProfileStarted, (state, action) =>{
        state.error = undefined;
        state.user = undefined;
        state.loading = true;
    })
    .addCase(FetchProfileSuccess, (state, action)=>{
        state.user = action.payload;
        state.loading  = false;
    })
    .addCase(FetchProfileFailure, (state, action)=>{
        state.loading  = false;
        state.error = action.payload;
    })
    .addCase(ChangeProfileEdit, (state, action) =>{
        state.edit = action.payload;
    })
    .addCase(PutProfileStarted, (state, action) =>{
        state.saveLoading = true;
        state.saveError = undefined;
    })
    .addCase(PutProfileSuccess, (state, action) =>{
        state.saveLoading = false;
        state.edit = false;
    })
    .addCase(PutProfileFailure, (state, action) =>{
        state.saveLoading = false;
        state.saveError = action.payload;
    })
    .addCase(PutProfileErrorClose, (state, action) =>{
        state.saveError = undefined;
    })
);