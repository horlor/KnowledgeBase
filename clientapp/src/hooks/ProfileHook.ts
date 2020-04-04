import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { useEffect } from "react";
import { LoadTopicsThunk } from "../redux/reducers/TopicThunks";
import { LoadProfileThunk, UpdateProfileThunk } from "../redux/reducers/ProfileThunk";
import { UserUpdateRequest } from "../models/User";
import { ChangeProfileEdit, PutProfileErrorClose } from "../redux/reducers/ProfileReducer";


export const useProfileHook = () =>{
    const topics = useSelector((state: RootState) => state.topic.topics);
    const profile = useSelector((state: RootState) => state.profile);
    const edit = profile.edit;
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

    const closeError = () =>{
        dispatch(PutProfileErrorClose());
    }

    return {topics, save, profile, edit, setEdit, closeError};
}
