import { postAuthenticationThunk } from "Store/Modules/Authentication/thunk";
import { PostAuthenticationData } from "./classes";

export function postAuthenticationRequisition(data: PostAuthenticationData) {
    postAuthenticationThunk(data);
}