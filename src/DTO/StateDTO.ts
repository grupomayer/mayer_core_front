export class StateDTO {
    constructor(
        public readonly state_name: string,
        public readonly uf: string,
        public readonly userId: number
    ) {}
}