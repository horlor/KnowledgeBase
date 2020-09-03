import { FetchQAStarted, FetchQASuccess, FetchQAFailure } from "./QuestionReducer";
import { AppDispatch } from "../Store";
import { LoadQuestionAnswerFromApi } from "../../api/QuestionApi";
import { CatchIntoErrorModel } from "../../helpers/ErrorHelpers";

export const LoadQuestionAnswersThunk = (id: number)=>{
	return async(dispatch: AppDispatch)=>{
		dispatch(FetchQAStarted());
        LoadQuestionAnswerFromApi(id)
        .then(resp => dispatch(FetchQASuccess(resp)))
        .catch(ex => dispatch(FetchQAFailure(CatchIntoErrorModel(ex))));
	}
}