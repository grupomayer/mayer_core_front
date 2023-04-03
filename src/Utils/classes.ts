import { SelectDataType } from "Interfaces/SelectDataType";

export class SelectDataClass implements SelectDataType {
    constructor(
        public readonly value: any,
        public readonly label: string,
    ) {}
}