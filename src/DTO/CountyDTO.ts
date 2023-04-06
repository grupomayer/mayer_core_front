import { StateDTO } from "./StateDTO";

export class CountyDTO {
    constructor(
        public readonly id: number,
        public readonly county_name: string,
        public readonly state: StateDTO
    ) {}
}