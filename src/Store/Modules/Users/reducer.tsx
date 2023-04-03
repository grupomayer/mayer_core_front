import { createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "DTO/UserDTO";

const initialState: Array<UserDTO> = [];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUsers: (state, { payload }) => {
            return payload;
        },
        deleteUser: (state, { payload }) => {
            return state.filter(user => user.id !== payload);
        },
        putUser: (state, { payload }) => {
            return state.map(user => {
                if(user.id === payload.id) {
                    Object.assign(user, { ...user, ...payload });
                }
                return user;
            })
        }
    }
});

export const usersReducer = usersSlice.reducer;
export const { getUsers, deleteUser, putUser } = usersSlice.actions;