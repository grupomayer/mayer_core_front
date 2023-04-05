import { createSlice } from "@reduxjs/toolkit";
import { ServiceDTO } from "DTO/ServiceDTO";

const initialState: Array<ServiceDTO> = [];

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        getServices: (state, { payload }) => {
            return payload;
        },
        putTransferServices: (state, { payload }) => {
            return state.filter(service => service.id !== payload);
        }
    }
});

export const { getServices, putTransferServices } = servicesSlice.actions;
export const servicesReducer = servicesSlice.reducer;