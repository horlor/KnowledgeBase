import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useEffect } from "react";
import { FetchUsersStarted, FetchUsersSuccess, FetchUsersFailure, FetchSelectedUserStarted, FetchSelectedUserFailure, FetchSelectedUserSuccess } from "../redux/reducers/UserReducer";
import { LoadUsersFromApi, LoadUserDetailedFromApi } from "../api/UserApi";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";


export const useUserListHook = ()=>{
    const dispatch : AppDispatch = useDispatch();
    const users = useSelector((state: RootState)=> state.user.users);
    const error = useSelector((state: RootState) => state.user.error);
    const loading = useSelector((state: RootState) => state.user.loading);
    const selectedUser = useSelector((state: RootState)=> state.user.selectedUser);
    const selectedError = useSelector((state: RootState) => state.user.selectedError);
    const selectedLoading = useSelector((state: RootState) => state.user.selectedLoading);

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
        dispatch(FetchSelectedUserStarted());
        LoadUserDetailedFromApi(username)
        .then(resp => dispatch(FetchSelectedUserSuccess(resp)))
        .catch(error => dispatch(FetchSelectedUserFailure(CatchIntoErrorModel(error))));
    }

    return { users, error, loading, selectedError, selectedUser, selectedLoading, switchSelected};
}
