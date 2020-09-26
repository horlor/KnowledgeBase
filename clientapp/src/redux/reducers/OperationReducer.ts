import { createAction, createReducer } from "@reduxjs/toolkit";
import ErrorModel from "../../models/ErrorModel";

interface IOperationState{
	isBusy: boolean,
	message: string
	error?: ErrorModel,
}

const initialState: IOperationState={
	isBusy: false,
	message:"",
}

export const OperationStartedAction = createAction<string>("operation-started");
export const OperationSuccessAction = createAction("operation-success");
export const OperationFailedAction = createAction<ErrorModel>("operation-failed");
export const OperationErrorDismissedAction = createAction("operation-error-dismissed");

export const OperationReducer = createReducer(initialState, builder => builder
	.addCase(OperationStartedAction, (state, action)=>{
		state.error = undefined;
		state.isBusy = true;
		state.message = action.payload;
	})
	.addCase(OperationSuccessAction, (state, action)=>{
		state.message = "";
		state.isBusy = false;
	})
	.addCase(OperationFailedAction, (state, action)=>{
		state.isBusy = false;
		state.message = "";
		state.error = action.payload;
	})
	.addCase(OperationErrorDismissedAction, (state, action)=>{
		state.error = undefined;
	})
	);