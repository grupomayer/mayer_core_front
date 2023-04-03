import { postUsersThunk } from "Store/Modules/Users/thunk";
import { PostUserData } from "./classes";

export function postUserRequisition(data: PostUserData) {
    data.dispatch(postUsersThunk(data));
}