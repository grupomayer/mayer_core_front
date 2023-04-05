import { getDepartmentAnalystsThunk } from "Store/Modules/Analysts/thunk";
import { putTransferServiceThunk } from "Store/Modules/Services/thunk";
import { GetDepartmentAnalystsData, PutTransferServiceData } from "./classes";

export function getDepartmentAnalystsRequisition(data: GetDepartmentAnalystsData) {
    data.dispatch(getDepartmentAnalystsThunk(data));
}

export function putTransferServiceRequisition(data: PutTransferServiceData) {
    data.dispatch(putTransferServiceThunk(data));
}