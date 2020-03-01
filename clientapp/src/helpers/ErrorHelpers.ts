import ErrorModel from "../models/ErrorModel";

export const CatchIntoErrorModel = (ex :any) =>{
    let error = ex as Error;
    let em : ErrorModel = {title:"Unexpected error", message:"An unexpected error occured during the operation"};
    if(error){
        console.log(error.message);
        if(error.message==="Network Exception")
            em={title:"Network error", message:"The remote server seems to be unavailable, please try connecting to it a later time"};
        let code = error.message.slice(error.message.length-3,error.message.length);
        console.log(`.${code}.`);
        if(code === "500")
            em={title:"Server error", message:"The remote server has unexpected errors, please try connect later"};
        if(code === "401")
            em = {title:"Authorization error", message:"You don't have the permissions to do this operation"};
        if(code === "404")
            em = {title:"Resource not found", message:"The requested resource is not available"};
    }
    return em;
}