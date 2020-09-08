import {createReducer, createAction} from '@reduxjs/toolkit'
import ErrorModel from '../../models/ErrorModel';
import { MyNotification } from '../../models/Notification';

interface INotificationState{
    items: MyNotification[],
    loading: boolean,
    error?: ErrorModel
}

const initialState: INotificationState={
    items:[],
    loading:false,
    error: undefined,
}

export const FetchNotificationsStarted = createAction("fetch-notifications-started");
export const FetchNotificationsSuccess = createAction<MyNotification[]>("fetch-notifications-success");
export const FetchNotificationsFailure = createAction<ErrorModel>("fetch-notifications-failure");
export const DeleteNotificationAction = createAction<MyNotification>("delete-notification");
export const SetImportantOnNotificationAction = createAction<{id: number, b: boolean}>("set-finished-notification");
export const SetSeenOnNotificationAction = createAction<{id: number, b: boolean}>("set-seen-notification");

export const NotificationReducer = createReducer(initialState, builder => builder
        .addCase(FetchNotificationsStarted, (state, action)=>{
            state.loading = true
            state.error = undefined
            state.items = []
        })
        .addCase(FetchNotificationsSuccess, (state: INotificationState, action)=>{
            state.loading = false;
            state.items = action.payload
        })
        .addCase(FetchNotificationsFailure, (state: INotificationState, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(DeleteNotificationAction, (state: INotificationState, action)=>{
            state.items = state.items.filter(n => n.id !== action.payload.id);
        })
        .addCase(SetImportantOnNotificationAction, (state : INotificationState, action)=>{
            let a = state.items.find(n => n.id === action.payload.id);
            if(a)
                a.important = action.payload.b;
        })
        .addCase(SetSeenOnNotificationAction, (state: INotificationState, action)=>{
            let a = state.items.find(n => n.id === action.payload.id)
            if(a)
                a.seen = action.payload.b;
        })
    );

