import { IError } from "./interfaces/interfaces";

export const defaultErrorMessage = "Ocorreu um erro inesperado :("

const loginErrorsData: Array<IError> = [
    { code: 404, component: "Login", message: "Email ou senha incorretos." },
    { code: 401, component: "Login", message: "Email ou senha incorretos." },
];

const registerUserErrorsData: Array<IError> = [
    { code: 409, component: "RegisterUser", message: "Esse usuário já está cadastrado no sistema." }
];

export const errorsData: Array<IError> = [
    ...loginErrorsData,
    ...registerUserErrorsData
];