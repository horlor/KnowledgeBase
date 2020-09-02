import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { useEffect } from "react";
import { LoadTopicsThunk } from "../redux/reducers/TopicThunks";
import { LoadProfileThunk, UpdateProfileThunk } from "../redux/reducers/ProfileThunk";
import { UserUpdateRequest } from "../models/User";
import { ChangeProfileEdit, PutProfileErrorClose } from "../redux/reducers/ProfileReducer";
import { UploadAvatar, DeleteAvatar } from "../api/ProfileApi";


export const useProfileHook = () =>{
    const topics = useSelector((state: RootState) => state.topic.topics);
    const profile = useSelector((state: RootState) => state.profile);
    const edit = profile.edit;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(LoadTopicsThunk());
        dispatch(LoadProfileThunk());
        
    },[dispatch])

    const save = (request: UserUpdateRequest, avatar?: FileList) =>{
        dispatch(UpdateProfileThunk(request));
        if(avatar){
            UploadAvatar(avatar);
        }
    }

    const deleteAvatar = async () =>{
        await DeleteAvatar();
    }

    const setEdit =(b: boolean) =>{
        dispatch(ChangeProfileEdit(b));
    }

    const closeError = () =>{
        dispatch(PutProfileErrorClose());
    }

    return {topics, save, profile, edit, setEdit, deleteAvatar, closeError};
}
