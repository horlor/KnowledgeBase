import { configureStore, combineReducers } from "@reduxjs/toolkit";
import QuestionReducer from "./reducers/QuestionReducer";
import { LoginReducer } from "./reducers/LoginReducer";
import { UserReducer } from "./reducers/UserReducer";
import { TopicReducer } from "./reducers/TopicReducer";

const rootReducer = combineReducers({
    question: QuestionReducer,
    login: LoginReducer,
    user: UserReducer,
    topic: TopicReducer,
});


export const AppStore = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof AppStore.dispatch;
