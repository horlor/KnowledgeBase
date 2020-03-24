import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useEffect, useState } from "react";
import { FetchUsersStarted, FetchUsersSuccess, FetchUsersFailure, FetchSelectedUserStarted, FetchSelectedUserFailure, FetchSelectedUserSuccess, ChangeProfileEdit } from "../redux/reducers/UserReducer";
import { LoadUsersFromApi, LoadUserDetailedFromApi, UpdateProfileToApi } from "../api/UserApi";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";
import { LoadTopicsThunk } from "../redux/reducers/TopicThunks";
import { UserUpdateRequest, UserDetailed } from "../models/User";
import { LoadProfileThunk, UpdateProfileThunk } from "../redux/reducers/UserThunks";
import { useForm } from "react-hook-form";


export const useUserListHook = ()=>{
    const dispatch : AppDispatch = useDispatch();
    const users = useSelector((state: RootState)=> state.user.users);
    const error = useSelector((state: RootState) => state.user.error);
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(()=>{
        dispatch(FetchUsersStarted());
        LoadUsersFromApi()
        .then(resp => {
            dispatch(FetchUsersSuccess(resp));
        })
        .catch( err =>
            dispatch(FetchUsersFailure(CatchIntoErrorModel(err)))
        );
    }, [dispatch])

    const switchSelected = (username: string) =>{

    }

    return { users, error, loading, switchSelected};
}

export const useSelectedUserHook = (username: string)=>{
    const dispatch : AppDispatch = useDispatch();
    const user = useSelector((state: RootState) =>state.user.selectedUser);
    const loading = useSelector((state: RootState) => state.user.selectedLoading);
    const error = useSelector((state: RootState) => state.user.selectedError);
    console.log("WTF");
    useEffect( () =>{
        const fetch = async() =>{
            dispatch(FetchSelectedUserStarted());
            try{
                var user = await LoadUserDetailedFromApi(username);
                dispatch(FetchSelectedUserSuccess(user));
            }
            catch (exc){
                dispatch(FetchSelectedUserFailure(CatchIntoErrorModel(exc)));
            }
        }
        fetch();
    },[dispatch, username])

    return {user, loading, error};

}


export const useProfileHook = () =>{
    const topics = useSelector((state: RootState) => state.topic.topics);
    const profile = useSelector((state: RootState) => state.user.profile);
    const edit = useSelector((state: RootState) => state.user.profile.edit);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(LoadTopicsThunk());
        dispatch(LoadProfileThunk());
        
    },[dispatch])

    const save = (request: UserUpdateRequest) =>{
        dispatch(UpdateProfileThunk(request));
    }

    const setEdit =(b: boolean) =>{
        dispatch(ChangeProfileEdit(b));
    }
    return {topics, save, profile, edit, setEdit};
}
