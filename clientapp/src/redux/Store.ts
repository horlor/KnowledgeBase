import { configureStore, combineReducers } from "@reduxjs/toolkit";
import QuestionReducer from "./question/QuestionReducer";
import { UserReducer } from "./user/UserReducer";

const rootReducer = combineReducers({
    question: QuestionReducer,
    user: UserReducer,
});


export const AppStore = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof AppStore.dispatch;
