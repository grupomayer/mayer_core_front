import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCore } from "Http/http";
import { PostAuthenticationData } from "Pages/Login/utils/classes";
import { authenticate } from "./reducer";

export function postAuthenticationThunk({ dispatch, email, password, setLoading, setError }: PostAuthenticationData) {
    const thunk = createAsyncThunk(
        "@authentication/POST",
        async () => {
            httpCore.post("/login/", {
                "email": email,
                "password": password
            })
                .then(response => {
                    dispatch(authenticate(response.data));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );
    return thunk();
}