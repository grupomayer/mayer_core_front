import { AnalystDTO } from "DTO/AnalystDTO";
import { ProviderServiceLocale } from "Models/provider_service_locale";

export class Service {

    private _solicitationDate: Date = new Date();
    private _evidentialDocument: string | undefined;
    private _demand: number | undefined | "Not registered";
    private _id: number | undefined;

    constructor(
        public readonly processNumber: number,
        public readonly idProvider: number,
        public readonly idAnalyst: number | AnalystDTO,
        public readonly serviceType: string,
        public readonly serviceLocale: ProviderServiceLocale,
        public readonly client: string,
        public readonly branch: string,
        private _finished: boolean,
        demand?: number | "Not registered",
        date?: Date,
        id?: number,
        evidentialDocument?: string | null
    ) {
        if(demand) {
            this._demand = demand;
        }
        if(id) {
            this._id = id;
        }
        if(date) {
            this._solicitationDate = date;
        }
        if(evidentialDocument) {
            this._evidentialDocument = evidentialDocument;
        }
    }

    public get demand() {
        return this._demand;
    }

    public get id() {
        return this._id;
    }

    public get solicitationDate() {
        return this._solicitationDate;
    }

    public get evidentialDocument() {
        return this._evidentialDocument ? this._evidentialDocument : "";
    }

    public set evidentialDocument(document: string) {
        this._evidentialDocument = document;
    }

    public setDemand(demand: number) {
        this._demand = demand;
    }

    public set finished(finished: boolean) {
        this._finished = finished;
    }

    public get finished() {
        return this._finished;
    }

}