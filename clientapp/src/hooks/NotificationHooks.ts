import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../redux/Store"
import { useEffect, useState } from "react"
import { LoadNotificationsFromApi, DeleteNotification, PatchNotificationFinished, LoadPendingNotifications } from "../api/ProfileApi"
import { FetchNotificationsStarted, FetchNotificationsSuccess, FetchNotificationsFailure, DeleteNotificationAction, SetFinishedOnNotificationAction } from "../redux/reducers/NotificationReducer"
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

    const setFinish = async (n: MyNotification) =>{
        try{
            await PatchNotificationFinished(n.id,!n.finished);
            dispatch(SetFinishedOnNotificationAction({id: n.id, b: !n.finished}));
        }
        catch(exc){
            console.log("Finish failed");
        }
    }

    return {notifications, error, loading, deleteNotification, setFinish};
}

export const useNotificationsWithUpdate = () =>{
    const dispatch : AppDispatch = useDispatch();
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [forwardLink, setForward] = useState("#");

    const checkForPending = async () =>{
        console.log("check");
        try{
            setForward("#")
            let dto = await LoadPendingNotifications();
            if(dto.count >0){
                setMessage(`You have ${dto.count} pending notifications`);
                setOpen(true);
                setForward("/notifications")
            }
        }
        catch(exc){
            console.log("Remote server unavailable")
        }       
    }
    useEffect(()=>{
        checkForPending();
        const timer = window.setInterval(()=>{
            checkForPending();
        },300000)
        return ()=>{
            window.clearInterval(timer)
        }
    },[dispatch])

    const handleClose = ()=>{
        setOpen(false);
    }
    return { message, open, handleClose, forwardLink};
}