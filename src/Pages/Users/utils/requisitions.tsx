import { getUsersThunk } from "Store/Modules/Users/thunk";
import { GetUsersData } from "./classes";

export function getUsersRequisition(data: GetUsersData) {
    data.dispatch(getUsersThunk(data));
}