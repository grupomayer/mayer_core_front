import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpProvider } from "Http/http";
import { GetUserServicesData } from "Pages/TransferServices/ShowUserServices/utils/classes";
import { getServices } from "./reducer";

export function getUserServicesThunk({ analystId, dispatch, setError, setLoading }: GetUserServicesData) {
    const thunk = createAsyncThunk(
        "services/GET",
        async () => {
            httpProvider.get("")
                .then(response => {
                    setLoading(true);
                    dispatch(getServices(response.data));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    )
    return thunk();
}