import { AppDispatch } from "Store/store";
import { Setter } from "Types/useState";

export class GetDepartmentAnalystsData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly department: string,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}

export class PutTransferServiceData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly userId: number,
        public readonly serviceId: number,
        public readonly newAnalystId: number,
        public readonly secondAnalystId: number,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}