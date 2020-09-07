import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../redux/Store"
import { useEffect, useState } from "react"
import { LoadNotificationsFromApi, DeleteNotification, PatchNotificationFinished, LoadPendingNotifications } from "../api/ProfileApi"
import { FetchNotificationsStarted, FetchNotificationsSuccess, FetchNotificationsFailure, DeleteNotificationAction, SetFinishedOnNotificationAction } from "../redux/reducers/NotificationReducer"
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers"
import { MyNotification } from "../models/Notification"
import { NotificationService } from "../api/NotificationApi"

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

    const setFinish = async (n: MyNotification) =>{
        try{
            await PatchNotificationFinished(n.id,!n.important);
            dispatch(SetFinishedOnNotificationAction({id: n.id, b: !n.important}));
        }
        catch(exc){
            console.log("Finish failed");
        }
    }

    return {notifications, error, loading, deleteNotification, setFinish};
}

export const useNotificationsWithUpdate = () =>{
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [forwardLink, setForward] = useState("#");

    const onNotification = (notification: MyNotification) =>{
        console.log("getNotification");
        setMessage(notification.title);
        setOpen(true);
        setForward("/notifications");  
    }


    useEffect(()=>{
        const onEffect = async()=>{
            let token = localStorage.getItem("Viknowledge-token")
            if(token){
                await NotificationService.subscribe(token)
                NotificationService.setOnNotification(onNotification)
    
            }
        }
        onEffect();
        return ()=>{
            NotificationService.unsubscribe()
        }
    },[])

    const handleClose = ()=>{
        setOpen(false);
    }

    const Ping =  async()=>{
        await NotificationService.ping();
    }
    return { message, open, handleClose, Ping, forwardLink};
}