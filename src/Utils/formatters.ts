import React, { SetStateAction } from "react";

const currencyFormatter = Intl.NumberFormat("pt-BR", { style: 'currency', currency: "BRL" });

export const formatFirstLettersUppercase = (string: string) => {
    if(string.replaceAll(" ", "") !== "") {
        let slicedString = string.split(' ');
        let formattedString = '';
        slicedString.forEach(slice => {
            formattedString += `${String(slice).slice(0, 1).toUpperCase()}${String(slice).slice(1, String(slice).length).toLowerCase()} `;
        })
        return formattedString.slice(0, formattedString.length - 1);
    }else {
        return ""
    }
}

export function formatCurrencyToNumber(value: string): number {
    return Number(value.replaceAll("R$", "").replaceAll(".", "").replaceAll(",", "."));
}

export function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
}

export function cleanString(target: string, ...chars: Array<string>): string {
    let targetCleaned = target;
    for (const char of chars) {
        targetCleaned = targetCleaned.replaceAll(char, "");
    }
    return targetCleaned
}

export function formatDate(date: Date): string {
    let placeholder = "dd/MM/yyyy";
    placeholder = placeholder.replace("dd", String(date.getUTCDate()).padStart(2, "0"));
    placeholder = placeholder.replace("MM", `${Number(date.getUTCMonth()) + 1}`.padStart(2, "0"));
    placeholder = placeholder.replace("yyyy", String(date.getUTCFullYear()).padStart(2, "0"));
    return placeholder;
}

export function formatToJSTypeDate(date: string): string {
    let placeholder = "yyyy-mm-dd";
    const parts = date.split("/");
    placeholder = placeholder.replace("yyyy", parts[2]);
    placeholder = placeholder.replace("mm", parts[1]);
    placeholder = placeholder.replace("dd", parts[0]);
    return placeholder;
}

export function formatCPF(cpf: string, ...chars: Array<string>): string {
    let cleanedCpf = cleanString(cpf, ...chars);
    if (!isNaN(parseInt(cleanedCpf))) {
        const placeholder = "xxx.xxx.xxx-xx";
        return formatter(placeholder, cleanedCpf);
    }
    return cpf;
}

export function formatCNPJ(cpf: string, ...chars: Array<string>): string {
    let cleanedCpf = cleanString(cpf, ...chars);
    if (!isNaN(parseInt(cleanedCpf))) {
        const placeholder = "xx.xxx.xxx/xxxx-xx";
        return formatter(placeholder, cleanedCpf);
    }
    return cpf;
}

export function formatCEP(cep: string, ...chars: Array<string>): string {
    let cleanedCep = cleanString(cep, ...chars);
    if (!isNaN(parseInt(cleanedCep))) {
        const placeholder = "xxxxx-xxx";
        return formatter(placeholder, cleanedCep);
    }
    return cep;
}

export function formatPhone(phone: string, ...chars: Array<string>): string {
    let cleanedPhone = cleanString(phone, ...chars);
    if (!isNaN(parseInt(cleanedPhone))) {
        const placeholder = "(xx) xxxxx-xxxx";
        return formatter(placeholder, cleanedPhone);
    }
    return phone;
}

function formatter(placeholder: string, value: string): string {
    let index = 0;
    let stepBack = 0;
    const phoneCharsLength = value.length;
    for (const char of placeholder) {
        const gap = index - stepBack;
        if (char === "x" && gap < phoneCharsLength) {
            const phoneChar = value.slice(gap, gap + 1);
            placeholder = placeholder.replace(char, phoneChar);
        } else {
            stepBack++;
        }
        index++;
    }
    return placeholder;
}

export function typedBackspace(oldValue: string, curValue: string): boolean {
    return oldValue.length > curValue.length;
}

export function removeLastChar(value: string, ...chars: Array<string>): string {
    const valueCleaned = cleanString(value, ...chars);
    return valueCleaned.slice(0, valueCleaned.length - 1);
}

export function setFormattedValue(
    oldValue: string, 
    value: string, 
    setter: React.Dispatch<SetStateAction<string>>, 
    formatter: (value: string, ...chars: Array<string>) => string, 
    ...removeChars: Array<string>
) {
    const chars = [...removeChars];
    if (typedBackspace(oldValue, value)) {
        value = removeLastChar(value, ...chars);
    }
    setter(formatter(value, ...chars));
}