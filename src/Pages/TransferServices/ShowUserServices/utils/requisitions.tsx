import { getUserServicesThunk } from "Store/Modules/Services/thunk";
import { GetUserServicesData } from "./classes";

export function getUserServicesRequisition(data: GetUserServicesData) {
    data.dispatch(getUserServicesThunk(data));
}