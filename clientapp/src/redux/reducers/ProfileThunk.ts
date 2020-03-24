import { UserUpdateRequest } from "../../models/User";
import { AppDispatch } from "../Store";
import { UpdateProfileToApi, LoadProfileFromApi } from "../../api/UserApi";
import { ChangeProfileEdit, FetchProfileStarted, FetchProfileSuccess, FetchProfileFailure } from "./ProfileReducer";
import { CatchIntoErrorModel } from "../../helpers/ErrorHelpers";


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