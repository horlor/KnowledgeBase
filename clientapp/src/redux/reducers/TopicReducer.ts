import { createReducer, createAction } from "@reduxjs/toolkit";
import { Topic } from "../../models/Topic";
import ErrorModel from "../../models/ErrorModel";

export const FetchTopicsStarted = createAction("fetch-topics-started");
export const FetchTopicsSuccess = createAction<Topic[]>("fetch-topics-success");
export const FetchTopicsFailure = createAction<ErrorModel>("fetch-topics-failure");
export const UpdateTopicAction = createAction<Topic>("update-topic");
export const DeleteTopicAction = createAction<Topic>("delete-topic");
export const CreateTopicAction = createAction<Topic>("create-topic");

interface ITopicState{
    loading: boolean,
    topics: Topic[],
    error?: ErrorModel
}

const initialState : ITopicState = {
    loading :false,
    topics:[]
}

export const TopicReducer = createReducer(initialState, builder => builder
    .addCase(FetchTopicsStarted, (state, action) =>{
        state.loading = true;
        state.error = undefined;
        state.topics = [];
    })
    .addCase(FetchTopicsSuccess, (state, action) =>{
        state.loading = false;
        state.topics = action.payload;
    })
    .addCase(FetchTopicsFailure, (state, action) =>{
        state.error = action.payload;
        state.loading = false;
    })
    .addCase(UpdateTopicAction, (state, action) =>{
        if(state.topics){
            let topic = state.topics.find(t => t.id === action.payload.id)
            if(topic)
                topic.name = action.payload.name;
        }
    })
    .addCase(DeleteTopicAction, (state, action) =>{
        if(state.topics)
            state.topics = state.topics.filter(t => t.id !== action.payload.id);
    })
    .addCase(CreateTopicAction, (state, action)=>{
        state.topics.push(action.payload);
        console.log(`Reducer: ${action.payload}`);
    })
);