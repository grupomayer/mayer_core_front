import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCore } from "Http/http";
import { GetUsersData } from "Pages/Users/utils/classes";
import { getUsers } from "./reducer";

export function getUsersThunk({ department, userId, dispatch, setError, setLoading }: GetUsersData) {
    const thunk = createAsyncThunk(
        "users/GET",
        async () => {
            httpCore.get(`/search-user/?param=all&admin=${userId}`)
                .then(response => {
                    setLoading(true);
                    dispatch(getUsers(response.data));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );

    return thunk();
}