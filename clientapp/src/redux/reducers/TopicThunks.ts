import { AppDispatch } from "../Store"
import { ThunkAction } from "@reduxjs/toolkit";
import { FetchTopicsStarted, FetchTopicsSuccess, FetchTopicsFailure } from "./TopicReducer";
import { LoadTopicsFromApi } from "../../api/TopicApi";
import { CatchIntoErrorModel } from "../../helpers/ErrorHelpers";

export const LoadTopicsThunk = () => {
    return async (dispatch: AppDispatch) =>{
        dispatch(FetchTopicsStarted());
        try{
            var topics = await LoadTopicsFromApi();
            dispatch(FetchTopicsSuccess(topics));
        }
        catch(exc){
            dispatch(FetchTopicsFailure(CatchIntoErrorModel(exc)));
        }
    }
} 