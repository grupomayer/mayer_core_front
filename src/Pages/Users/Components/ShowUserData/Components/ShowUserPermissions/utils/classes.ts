import { AppDispatch } from "Store/store";
import { Setter } from "Types/useState";

export class PutPermissionsData {
    constructor(
        public readonly dispatch: AppDispatch,
        public readonly permissions: PermissionsData,
        public readonly setLoading: Setter<boolean>,
        public readonly setError: Setter<number | null>
    ) {}
}

export class PermissionsData {
    constructor(
        public readonly id: number,
        public readonly isAdmin: boolean,
        public readonly isFinancial: boolean,
        public readonly isExecutiveBoard: boolean,
        public readonly isLegalArchitecture: boolean,
        public readonly isPublicity: boolean,
        public readonly isEvtl: boolean,
        public readonly isFireFighting: boolean,
        public readonly isLicensing: boolean,
        public readonly isWealthManagement: boolean,
        public readonly isCoordinator: boolean,
        public readonly isAnalyst: boolean,
        public readonly isRegisterCorporate: boolean,
        public readonly isSuperUser: boolean,
        public readonly isAvcb: boolean,
        public readonly adminId: number,
    ) {}
}