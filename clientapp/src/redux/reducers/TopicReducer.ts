import { createReducer, createAction } from "@reduxjs/toolkit";
import { Topic } from "../../models/Topic";
import ErrorModel from "../../models/ErrorModel";

export const FetchTopicsStarted = createAction("fetch-topics-started");
export const FetchTopicsSuccess = createAction<Topic[]>("fetch-topics-success");
export const FetchTopicsFailure = createAction<ErrorModel>("fetch-topics-failure");

interface ITopicState{
    loading: boolean,
    topics?: Topic[],
    error?: ErrorModel
}

const initialState : ITopicState = {
    loading :false,
}

export const TopicReducer = createReducer(initialState, builder => builder
    .addCase(FetchTopicsStarted, (state, action) =>{
        state.loading = true;
        state.error = undefined;
        state.topics = undefined;
    })
    .addCase(FetchTopicsSuccess, (state, action) =>{
        state.loading = false;
        state.topics = action.payload;
    })
    .addCase(FetchTopicsFailure, (state, action) =>{
        state.error = action.payload;
        state.loading = false;
    })
);