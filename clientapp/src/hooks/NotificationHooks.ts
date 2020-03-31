import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../redux/Store"
import { useEffect, useState } from "react"
import { LoadNotificationsFromApi, DeleteNotification } from "../api/ProfileApi"
import { FetchNotificationsStarted, FetchNotificationsSuccess, FetchNotificationsFailure, DeleteNotificationAction } from "../redux/reducers/NotificationReducer"
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers"
import { MyNotification } from "../models/Notification"

const loadAsync = async(dispatch: AppDispatch) =>{
    try{
        dispatch(FetchNotificationsStarted());
        let nots = await LoadNotificationsFromApi();
        dispatch(FetchNotificationsSuccess(nots))
    }
    catch(exc){
        dispatch(FetchNotificationsFailure(CatchIntoErrorModel(exc)));
    }
}

export const useNotifications = () =>{
    const notifications = useSelector((state: RootState) => state.notification.items)
    const error = useSelector((state: RootState) => state.notification.error)
    const loading = useSelector((state: RootState) => state.notification.loading)
    const dispatch : AppDispatch = useDispatch();

    useEffect(()=>{
        loadAsync(dispatch);
    },[dispatch])

    const deleteNotification = async (n: MyNotification)=>{
        try{
            await DeleteNotification(n);
            dispatch(DeleteNotificationAction(n));
        }
        catch(exc){
            console.log("something")
        }
    }

    return {notifications, error, loading, deleteNotification};
}

export const useNotificationsWithUpdate = () =>{
    const dispatch : AppDispatch = useDispatch();

    useEffect(()=>{
        const timer = window.setInterval(()=>{
            loadAsync(dispatch)
            console.log("Loaded in timeout")
        },300000)
        return ()=>{
            window.clearInterval(timer)
        }
    },[dispatch])
}