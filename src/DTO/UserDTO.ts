export class UserDTO {
    constructor(
        public readonly branch: string,
        public readonly cpf: string,
        public readonly department: string,
        public readonly email: string,
        public readonly id: number,
        public readonly name: string,
        public readonly phone: string
    ) {}
}