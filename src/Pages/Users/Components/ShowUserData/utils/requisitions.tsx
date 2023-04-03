import { putUserThunk } from "Store/Modules/Users/thunk";
import { PutUserData } from "./classes";

export function putUserRequisition(data: PutUserData) {
    data.dispatch(putUserThunk(data));
}