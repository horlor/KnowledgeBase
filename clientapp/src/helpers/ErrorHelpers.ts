import ErrorModel from "../models/ErrorModel";

export const CatchIntoErrorModel = (ex :any) =>{
    let error = ex as Error;
    console.log(ex);
    let em : ErrorModel = {code:"Unexpected error", description:"An unexpected error occured during the operation"};
    if(error){
        if(error.message==="Network Exception")
            em={code:"Network error", description:"The remote server seems to be unavailable, please try connecting to it a later time"};
        let code = error.message?.slice(error.message.length-3,error.message.length);
        if(code === "500")
            em={code:"Server error", description:"The remote server has unexpected errors, please try connect later"};
        if(code === "401")
            em = {code:"Authorization error", description:"You don't have the permissions to do this operation"};
        if(code === "404")
            em = {code:"Resource not found", description:"The requested resource is not available"};
    }
    return em;
}