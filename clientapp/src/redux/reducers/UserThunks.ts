import { AppDispatch } from "../Store"
import { CatchIntoErrorModel } from "../../helpers/ErrorHelpers";
import { FetchProfileStarted, FetchProfileSuccess, FetchProfileFailure, ChangeProfileEdit } from "./UserReducer";
import { LoadProfileFromApi, UpdateProfileToApi } from "../../api/UserApi";
import { UserUpdateRequest } from "../../models/User";

export const LoadProfileThunk = () => {
    return async (dispatch: AppDispatch) =>{
        dispatch(FetchProfileStarted());
        try{
            var user = await LoadProfileFromApi();
            dispatch(FetchProfileSuccess(user));
        }
        catch(exc){
            dispatch(FetchProfileFailure(CatchIntoErrorModel(exc)));
        }
    }
} 

export const UpdateProfileThunk = (request: UserUpdateRequest) =>{
    return async (dispatch : AppDispatch) =>{
        await UpdateProfileToApi(request);
        dispatch(ChangeProfileEdit(false));
        dispatch(LoadProfileThunk());
    }
}