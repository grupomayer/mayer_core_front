export class Analyst {
    
    private _id: number | undefined;

    constructor(
        public readonly name: string,
        public readonly department: string,
        public readonly branch: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly password: string,
        public readonly analystType: string,
        public readonly cpf: string,
        id?: number | null
    ) {
        if(id) {
            this._id = id;
        }
    }

    public get id() {
        return this._id;
    }

}