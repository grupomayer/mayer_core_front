import { postAuthenticationThunk } from "Store/Modules/Authentication/thunk";
import { PostAuthenticationData } from "./classes";

export function postAuthenticationRequisition(data: PostAuthenticationData) {
    data.dispatch(postAuthenticationThunk(data));
}