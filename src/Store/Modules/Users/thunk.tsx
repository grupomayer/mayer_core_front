import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCore } from "Http/http";
import { PostUserData } from "Pages/RegisterUsers/utils/classes";
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

export function postUsersThunk({ analyst, userId, dispatch, setError, setLoading }: PostUserData) {
    const thunk = createAsyncThunk(
        "users/GET",
        async () => {
            httpCore.post(``)
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