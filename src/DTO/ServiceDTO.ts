import { ProviderServiceLocale } from "Models/provider_service_locale";
import { Service } from "Models/service";
import { AnalystDTO } from "./AnalystDTO";
import { CountyDTO } from "./CountyDTO";
import { StateDTO } from "./StateDTO";

export class ServiceDTO {
    constructor(
        public readonly id: number,
        public readonly provider_id: number,
        public readonly analyst_id: number,
        public readonly analyst: AnalystDTO,
        public readonly state: StateDTO,
        public readonly county: CountyDTO,
        public readonly process_number: number,
        public readonly demand: number,
        public readonly solicitation_type: string,
        public readonly client: string,
        public readonly branch: string,
        public readonly solicitation_date: string,
        public readonly finished: boolean,
        public readonly evidential_document: string,
        public readonly evidential_document_prestige: string | null,
    ) {}

    public static toService(serviceDto: ServiceDTO): Service {
        return new Service(
            serviceDto.process_number,
            serviceDto.provider_id,
            serviceDto.analyst,
            serviceDto.solicitation_type,
            new ProviderServiceLocale(serviceDto.county.county_name, serviceDto.state.state_name),
            serviceDto.client,
            serviceDto.branch,
            serviceDto.finished,
            serviceDto.demand,
            new Date(serviceDto.solicitation_date),
            serviceDto.id,
            serviceDto.evidential_document_prestige || serviceDto.evidential_document
        );
    }
}