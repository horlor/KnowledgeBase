import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useEffect } from "react";
import { FetchUsersStarted, FetchUsersSuccess, FetchUsersFailure } from "../redux/reducers/UserReducer";
import { LoadUsersFromApi } from "../api/UserApi";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";


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

    return { users, error, loading};
}
