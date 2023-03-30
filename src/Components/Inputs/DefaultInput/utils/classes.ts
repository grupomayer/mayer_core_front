import { SelectDataType } from "Interfaces/SelectDataType";

export class DefaultInputData {

    public readonly data: Array<SelectDataType> | undefined;
    public readonly required: boolean | undefined;
    public readonly className: string | undefined;
    public readonly min: number | undefined;
    public readonly max: number | undefined;
    public readonly isPositionFixed: boolean | undefined;

    private _disabled: boolean = false;

    constructor(
        public readonly value: any,
        public readonly onChange: React.Dispatch<React.SetStateAction<any>>,
        public readonly id: string,
        public readonly type: "text" | "number" | "select" | "password" | "email" | "textarea" | "checkbox" | "date" | "file",
        public readonly title: string,
        public readonly placeholder: string,
        public readonly label: string,
        data?: Array<SelectDataType>,
        required?: boolean,
        disabled?: boolean,
        className?: string,
        min?: number,
        max?: number,
        isPositionFixed?: boolean,
    ) {
        if (data) {
            this.data = data;
        }
        if (required !== undefined) {
            this.required = required;
        }
        if (disabled) {
            this._disabled = disabled;
        }
        if(min !== undefined) {
            this.min = min;
        }
        if(max !== undefined) {
            this.max = max;
        }
        if(className !== undefined) {
            this.className = className;
        }
        if(isPositionFixed !== undefined) {
            this.isPositionFixed = isPositionFixed;
        }
    }

    public get disabled() {
        return this._disabled;
    }

    public setDisabled(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

}