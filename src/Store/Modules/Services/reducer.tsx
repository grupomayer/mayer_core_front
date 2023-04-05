import { createSlice } from "@reduxjs/toolkit";
import { ServiceDTO } from "DTO/ServiceDTO";

const initialState: Array<ServiceDTO> = [];

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        getServices: (state, { payload }) => {
            return [payload];
        }
    }
});

export const { getServices } = servicesSlice.actions;
export const servicesReducer = servicesSlice.reducer;