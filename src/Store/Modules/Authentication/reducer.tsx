import { createSlice } from "@reduxjs/toolkit";
import { LoginDTO } from "DTO/LoginDTO";

const initialState: Array<LoginDTO> = [];

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        authenticate: (state, { payload }) => {
            return payload;
        }
    }
})

export const authenticationReducer = authenticationSlice.reducer;
export const { authenticate } = authenticationSlice.actions;