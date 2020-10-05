import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ChangePassword, RequestPasswordRecovery, RequestPasswordReset } from "../api/ProfileApi";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";
import { OperationFailedAction, OperationStartedAction, OperationSuccessAction } from "../redux/reducers/OperationReducer";


export const usePasswordRecoveryHook = ()=>{
	const [error, setError] = useState<string>()
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	async function passwordRecovery(username: string){
		try{
			setError(undefined);
			setSuccess(false);
			setLoading(true);
			await RequestPasswordRecovery(username);
			setLoading(false);
			setSuccess(true);
		}
		catch(ex){
			setLoading(false)
			let em = CatchIntoErrorModel(ex);
			if(em.code === 404)
				setError("The given username does not exist in our databases.")
			else
				setError("Unexpected error occured, maybe the server is unavailable or overloaded, please try it later");
		}
	}

	return {passwordRecovery, success, error, loading}
}

export const usePasswordResetHook = ()=>{
	const history = useHistory();
	const params = new URLSearchParams(history.location.search);
	const username = params.get("username"), token = params.get("token");
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);

	async function resetPassword(password: string){
		try{
			if(username && token){
				setError(undefined)
				setLoading(true)
				await RequestPasswordReset(username, token, password);
				history.push("/login")
			}
		}
		catch(ex){
			let em = CatchIntoErrorModel(ex);
			setLoading(false)
			setError("The link you used is expired, please ask for a new one.")
		}
	}

	return {valid:username && token, username, resetPassword, error, loading}
}

export const usePasswordChangeHook = ()=>{
	const dispatch = useDispatch();
	
	const changePassword = async(oldPassword: string, newPassword: string)=>{
        dispatch(OperationStartedAction("Changing password..."));
        try{
            await ChangePassword(oldPassword, newPassword);
            dispatch(OperationSuccessAction())
        }
        catch(exc){
            dispatch(OperationFailedAction(CatchIntoErrorModel(exc)));
        }
	}
	return {changePassword};
}