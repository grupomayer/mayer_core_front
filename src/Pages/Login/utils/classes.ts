import { AppDispatch } from "Store/store";
import { Setter } from "Types/useState";

export class PostAuthenticationData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly email: string,
        public readonly password: string,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}