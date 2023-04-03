import { putUserPermissionsThunk } from "Store/Modules/Users/thunk";
import { PutPermissionsData } from "./classes";

export function putPermissionsRequisition(data: PutPermissionsData) {
    data.dispatch(putUserPermissionsThunk(data));
}