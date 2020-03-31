import { UserUpdateRequest } from "../../models/User";
import { AppDispatch } from "../Store";
import { UpdateProfileToApi, LoadProfileFromApi } from "../../api/ProfileApi";
import { ChangeProfileEdit, FetchProfileStarted, FetchProfileSuccess, FetchProfileFailure, PutProfileStarted, PutProfileSuccess, PutProfileFailure } from "./ProfileReducer";
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
            dispatch(PutProfileStarted());
            try{
                await UpdateProfileToApi(request);
                dispatch(PutProfileSuccess());
                dispatch(LoadProfileThunk());
            }
            catch(exc){
                dispatch(PutProfileFailure(CatchIntoErrorModel(exc)))
            }
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}