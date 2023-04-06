export class ProviderServiceLocale {
    constructor(
        public readonly city: string,
        public readonly state: string,
    ) {}

    public isValidLocale(): boolean {
        return this.city !== "" && this.state !== "";
    }

    public isEqual(serviceLocale: ProviderServiceLocale) {
        return this.city === serviceLocale.city 
        && this.state === serviceLocale.state;
    }

    public toString(): string {
        return `${this.state} - ${this.city}`;
    }
 
}