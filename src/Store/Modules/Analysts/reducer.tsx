import { createSlice } from "@reduxjs/toolkit";
import { AnalystDTO } from "DTO/AnalystDTO";

const initialState: Array<AnalystDTO> = [];

const analystsSlice = createSlice({
    name: "analysts",
    initialState,
    reducers: {
        getDepartmentAnalysts: (state, { payload }) => {
            return payload;
        }
    }
});

export const { getDepartmentAnalysts } = analystsSlice.actions;
export const analystsReducer = analystsSlice.reducer;