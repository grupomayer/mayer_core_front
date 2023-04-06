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
    new SelectDataClass("AVCB", "AVCB"),
    new SelectDataClass("Recepção", "Recepção")
];

export const analystTypes = [
    new SelectDataClass("executive_board", "Diretoria"),
    new SelectDataClass("register_corporate", "Registrário"),
    new SelectDataClass("publicity", "Publicidade"),
    new SelectDataClass("licensing", "Licenciamento"),
    new SelectDataClass("legal_architecture", "Arquitetura"),
    new SelectDataClass("evtl", "EVTL"),
    new SelectDataClass("fire_fighting", "Incêndio"),
    new SelectDataClass("wealth_management", "Gestão Patrimonial"),
    new SelectDataClass("superuser", "Desenvolvimento de Sistemas e TI"),
    new SelectDataClass("admin", "Administrativo"),
    new SelectDataClass("financial", "Financeiro"),
    new SelectDataClass("avcb", "AVCB")
];

export function findCurAnalystType(department: string): string {
    return analystTypes.find(type => type.label === department)?.value;
}