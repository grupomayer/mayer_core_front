export class UserDTO {
    constructor(
        public readonly branch: string,
        public readonly cpf: string,
        public readonly department: string,
        public readonly email: string,
        public readonly id: number,
        public readonly name: string,
        public readonly phone: string,
        public readonly is_avcb: boolean,
        public readonly is_coordinator: boolean,
        public readonly is_evtl: boolean,
        public readonly is_executive_board: boolean,
        public readonly is_financial: boolean,
        public readonly is_fire_fighting: boolean,
        public readonly is_legal_architecture: boolean,
        public readonly is_licensing: boolean,
        public readonly is_publicity: boolean,
        public readonly is_register_corporate: boolean,
        public readonly is_wealth_management: boolean,
        public readonly is_analyst: boolean,
        public readonly is_superuser: boolean,
        public readonly is_admin: boolean,
        public readonly is_audit: boolean,
        public readonly is_validator: boolean
    ) {}
}