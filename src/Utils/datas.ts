import { SelectDataType } from "Interfaces/SelectDataType";
import { SelectDataClass } from "./classes";

export const branchs: Array<SelectDataType> = [
    new SelectDataClass("Matriz", "Matriz"),
    new SelectDataClass("Filial SP", "Filial SP")
];

export const departments: Array<SelectDataType> = [
    new SelectDataClass("Diretoria", "Diretoria"),
    new SelectDataClass("Registrário", "Registrário"),
    new SelectDataClass("Publicidade", "Publicidade"),
    new SelectDataClass("Licenciamento", "Licenciamento"),
    new SelectDataClass("Arquitetura", "Arquitetura"),
    new SelectDataClass("EVTL", "EVTL"),
    new SelectDataClass("Incêndio", "Prevenção de incêndio"),
    new SelectDataClass("Gestão Patrimonial", "Gestão Patrimonial"),
    new SelectDataClass("T.I", "Desenvolvimento de Sistemas e TI"),
    new SelectDataClass("Administrativo", "Administrativo"),
    new SelectDataClass("Financeiro", "Financeiro"),
    new SelectDataClass("avcb", "AVCB")
]