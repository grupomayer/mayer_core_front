import { AppDispatch } from "Store/store";
import { Setter } from "Types/useState";

export class GetUserServicesData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly analystId: number,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}