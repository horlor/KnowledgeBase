import { useState, useEffect } from "react";
import { GetUsers, GetUserWithRole, PatchUserWithRole } from "../api/AdminApi";
import { User, UserWithRole } from "../models/User";
import ErrorModel from "../models/ErrorModel";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";
import { OperationFailedAction, OperationStartedAction, OperationSuccessAction } from "../redux/reducers/OperationReducer";
import { useDispatch } from "react-redux";

export const useAdminHook = () =>{
	const [users, setUsers] = useState<User[]>();
	const [selected,setSelected] = useState<UserWithRole>();
	const [error, setError] = useState<ErrorModel>();
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const dispatch = useDispatch();

	useEffect(()=>{
		(async() =>{
			try{
				let data = await GetUsers();
				setUsers(data.data);
			}
			catch(exc){
				setError(CatchIntoErrorModel(exc));
			}
		})();
	},[]);

	const onItemSelected = async (user : User, idx:number) =>{
		setSelectedIndex(idx);
		setSelected((await GetUserWithRole(user.userName)).data);
	}

	const onRoleChange = (role: string)=>{
		if(selected)
			setSelected({...selected, role: role})
		console.log(selected);
	}

	const saveChanges = async()=>{
		try{
			if(selected){
				dispatch(OperationStartedAction("Changing role..."))
				await PatchUserWithRole(selected.userName,selected.role);
				dispatch(OperationSuccessAction());
			}
		}
		catch(ex){
			dispatch(OperationFailedAction(CatchIntoErrorModel(ex)));
		}

		 
	}

	return {error, users, selectedIndex, onItemSelected, selected, onRoleChange, saveChanges};

}