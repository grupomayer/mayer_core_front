import { httpCore } from "Http/http";
import { PostAuthenticationData } from "Pages/Login/utils/classes";
import { authenticate } from "./reducer";

export function postAuthenticationThunk({ dispatch, email, password, setError }: PostAuthenticationData) {
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