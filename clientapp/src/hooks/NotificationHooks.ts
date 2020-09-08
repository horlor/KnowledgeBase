import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../redux/Store"
import { useEffect, useState } from "react"
import { LoadNotificationsFromApi, DeleteNotification, PatchNotificationFinished, LoadPendingNotifications } from "../api/ProfileApi"
import { FetchNotificationsStarted, FetchNotificationsSuccess, FetchNotificationsFailure, DeleteNotificationAction, SetImportantOnNotificationAction, SetSeenOnNotificationAction } from "../redux/reducers/NotificationReducer"
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

    const setImportant = async (n: MyNotification) =>{
        try{
            await NotificationService.setImportantOnNotification(n, !n.important)
            dispatch(SetImportantOnNotificationAction({id: n.id, b: !n.important}));
        }
        catch(exc){
            console.log("SetImportant failed");
            console.log(exc);
        }
    }

    const setSeen = async(n: MyNotification) => {
        try{
            await NotificationService.setSeenOnNotification(n, !n.seen)
            dispatch(SetSeenOnNotificationAction({id: n.id, b: !n.seen}));
        }
        catch(exc){
            console.log("SetSeen failed");
            console.log(exc);
        }
    }

    return {notifications, error, loading, deleteNotification, setImportant, setSeen};
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
                NotificationService.setRecieveNotification(onNotification)
    
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

    return { message, open, handleClose, forwardLink};
}