export class Analyst {
    
    private _id: number | undefined;

    constructor(
        public readonly name: string,
        public readonly department: string,
        public readonly branch: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly password: string,
        public readonly analystType: string,
        public readonly cpf: string,
        id?: number | null,
        public readonly data?: {
            is_admin: boolean,
            is_analyst: boolean,
            is_avcb: boolean,
            is_coordinator: boolean,
            is_evtl: boolean,
            is_executive_board: boolean,
            is_financial: boolean,
            is_fire_fighting: boolean,
            is_legal_architecture: boolean,
            is_licensing: boolean,
            is_publicity: boolean,
            is_register_corporate: boolean,
            is_superuser: boolean,
            is_wealth_management: boolean
        }
    ) {
        if(id) {
            this._id = id;
        }
    }

    public get id() {
        return this._id;
    }

}