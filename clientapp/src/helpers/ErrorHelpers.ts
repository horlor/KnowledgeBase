import { AxiosError } from "axios";
import ErrorModel from "../models/ErrorModel";

export const CatchIntoErrorModel = (ex :any) =>{
    let em : ErrorModel = {title:"Unexpected error", description:"An unexpected error occured during the operation", code:0};
    console.log(ex)
    if("isAxiosError" in ex){
        let error = ex as AxiosError;
        console.log(error.isAxiosError);
        console.log(error.name)
        console.log(error.request)
            if(error.message === "Network Error")
                em = {title:"Network error", description:"The remote server does not seem to be reachable, please check your internet connection, or try it again a later time", code: 0}
            switch(error.code){
                case "500":
                    em={title:"Server error", description:"The remote server has unexpected errors, please try connect later", code: 500};
                    break;
                case "401":
                    em = {title:"Authentication error", description:"You're not logged in or the session has been expired", code: 401};
                    break;
                case "403":
                    em = {title:"Authorization error", description:"You don't have the neccessary rights to access or edit this resource", code: 403};
                    break;
                case "404":
                    em = {title:"Resource not found", description:"The requested resource is not available", code: 404};
                    break;
            }
    }
    return em;
}