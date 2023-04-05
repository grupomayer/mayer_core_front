import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCore } from "Http/http";
import { GetDepartmentAnalystsData } from "Pages/TransferServices/ShowUserServices/Components/TransferServiceMenu/utils/classes";
import { getDepartmentAnalysts } from "./reducer";

export function getDepartmentAnalystsThunk({ dispatch, department, setError, setLoading }: GetDepartmentAnalystsData) {
    const thunk = createAsyncThunk(
        "@analysts/GET",
        async () => {
            httpCore.get(`/analyst-department/?param=${department}&query=True`)
                .then(response => {
                    setLoading(false);
                    dispatch(getDepartmentAnalysts(response.data));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );
    return thunk();
}