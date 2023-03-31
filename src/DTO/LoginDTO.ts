export class LoginDTO {
    constructor(
        public readonly token: string,
        public readonly data: {
            id: number,
            department: string,
            name: string,
            is_wealth_management: boolean,
            is_analyst: boolean,
            is_coordinator: boolean,
            is_evtl: boolean,
            is_executive_board: boolean,
            is_fire_fighting: boolean,
            is_legal_architecture: boolean,
            is_licensing: boolean,
            is_publicity: boolean,
            is_register_corporate: boolean,
            is_superuser: boolean,
            is_financial: boolean,
            is_admin: boolean
        }
    ) {}
}