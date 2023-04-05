import { Analyst } from "Models/analyst";

export class AnalystDTO {
    constructor(
        public readonly name: string,
        public readonly id: number,
        public readonly department: string,
        public readonly cpf: string,
        public readonly branch: string,
        public readonly email: string,
        public readonly phone: string,
    ) {}

    public static toAnalyst(analystDTO: AnalystDTO): Analyst {
        return new Analyst(
            analystDTO.name,
            analystDTO.department,
            analystDTO.branch,
            analystDTO.phone,
            analystDTO.email,
            "",
            "",
            analystDTO.cpf,
            analystDTO.id
        );
    }
}