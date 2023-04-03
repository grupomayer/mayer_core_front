import { createSlice } from "@reduxjs/toolkit";
import { LoginDTO } from "DTO/LoginDTO";

const initialState: LoginDTO = new LoginDTO("", {
    id: 0,
    department: "",
    name: "",
    is_admin: false,
    is_analyst: false,
    is_coordinator: false,
    is_evtl: false,
    is_executive_board: false,
    is_financial: false,
    is_fire_fighting: false,
    is_legal_architecture: false,
    is_licensing: false,
    is_publicity: false,
    is_register_corporate: false,
    is_superuser: false,
    is_wealth_management: false
});

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