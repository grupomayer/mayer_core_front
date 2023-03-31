import { createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "DTO/UserDTO";

const initialState: Array<UserDTO> = [];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUsers: (state, { payload }) => {
            return payload;
        }
    }
});

export const usersReducer = usersSlice.reducer;
export const { getUsers } = usersSlice.actions;