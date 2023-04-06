import { configureStore } from "@reduxjs/toolkit";
import { analystsReducer } from "./Modules/Analysts/reducer";
import { authenticationReducer } from "./Modules/Authentication/reducer";
import { servicesReducer } from "./Modules/Services/reducer";
import { usersReducer } from "./Modules/Users/reducer";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        users: usersReducer,
        services: servicesReducer,
        analysts: analystsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;