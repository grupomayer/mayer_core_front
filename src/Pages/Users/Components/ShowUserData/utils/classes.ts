import { Analyst } from "Models/analyst";
import { AppDispatch } from "Store/store";
import { Setter } from "Types/useState";

export class PutUserData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly analyst: Analyst,
        public readonly userId: number,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}