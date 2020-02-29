import { configureStore, combineReducers } from "@reduxjs/toolkit";
import QuestionReducer from "./question/QuestionReducer";
import { UserReducer } from "./user/UserReducer";

const rootReducer = combineReducers({
    questions: QuestionReducer,
});

export const createAppStore = () =>  configureStore({
    reducer: QuestionReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default createAppStore;