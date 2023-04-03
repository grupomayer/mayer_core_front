import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./Modules/Authentication/reducer";
import { usersReducer } from "./Modules/Users/reducer";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        users: usersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;