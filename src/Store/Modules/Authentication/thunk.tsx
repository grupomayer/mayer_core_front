import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDTO } from "DTO/LoginDTO";
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
                    const dataResponse: LoginDTO = response.data;
                    setLoading(true);
                    dispatch(authenticate(dataResponse));
                })
                .catch(error => {
                    setError(error.response.status);
                })
        }
    );
    return thunk();
}