import { AppDispatch } from "Store/store";
import { Setter } from "Types/useState";

export class GetUsersData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly department: string,
        public readonly userId: number,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}