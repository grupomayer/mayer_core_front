import { getDepartmentAnalystsThunk } from "Store/Modules/Analysts/thunk";
import { putTransferServiceThunk } from "Store/Modules/Services/thunk";
import { GetDepartmentAnalystsData, PutTransferServiceData } from "./classes";

export function getDepartmentAnalystsRequisition(data: GetDepartmentAnalystsData) {
    getDepartmentAnalystsThunk(data);
}

export function putTransferServiceRequisition(data: PutTransferServiceData) {
    putTransferServiceThunk(data);
}