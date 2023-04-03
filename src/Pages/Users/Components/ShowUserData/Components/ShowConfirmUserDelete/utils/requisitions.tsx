import { deleteUserThunk } from "Store/Modules/Users/thunk";
import { DeleteUserData } from "./classes";

export function deleteUserRequisition(data: DeleteUserData) {
    data.dispatch(deleteUserThunk(data));
}