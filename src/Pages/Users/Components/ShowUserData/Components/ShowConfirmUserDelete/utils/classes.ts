import { AppDispatch } from "Store/store";
import { Setter } from "Types/useState";

export class DeleteUserData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly analystId: number,
        public readonly adminId: number,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}