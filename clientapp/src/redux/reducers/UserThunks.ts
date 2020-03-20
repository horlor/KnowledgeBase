import { AppDispatch } from "../Store"
import { ThunkAction } from "@reduxjs/toolkit";
import { LoadTopicsFromApi } from "../../api/TopicApi";
import { CatchIntoErrorModel } from "../../helpers/ErrorHelpers";
import { FetchProfileStarted, FetchProfileSuccess, FetchProfileFailure } from "./UserReducer";
import { LoadProfileFromApi } from "../../api/UserApi";

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