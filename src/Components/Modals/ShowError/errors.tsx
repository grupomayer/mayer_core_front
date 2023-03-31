import { IError } from "./interfaces/interfaces";

export const defaultErrorMessage = "Ocorreu um erro inesperado :("

const loginErrorsData: Array<IError> = [
    { code: 404, component: "Login", message: "Email ou senha incorretos." },
    { code: 401, component: "Login", message: "Email ou senha incorretos." },
]

const serviceErrorsData: Array<IError> = [
    { code: 404, component: "Services", message: "Você não possui serviços em andamento." },
]

const providersErrorsData: Array<IError> = [
    { code: 208, component: "RegisterPrestador", message: "Esse prestador já possui cadastro no sistema." },
    { code: 404, component: "Providers", message: "Nenhum prestrador encontrado nessa cidade ou estado." },
    { code: 500, component: "DeleteProvider", message: "Esse prestador não pode ser deletado (existem serviços solicitados para ele)." },
]

const payedExpenseRecordsErrorsData: Array<IError> = [
    { code: 404, component: "PayedExpenseRecord", message: "Nenhum RG foi encontrado." },
]

const validExpenseRecordsErrorsData: Array<IError> = [
    { code: 404, component: "ValidExpenseRecord", message: "Não existem RGs para serem validados." },
]

const notPayedExpenseRecordsErrorsData: Array<IError> = [
    { code: 404, component: "NotPayedExpenseRecord", message: "Não existem novos RGs para serem pagos." },
]

const indicatorsErrorsData: Array<IError> = [
    { code: 404, component: "Indicators", message: "Ainda não existem indicators disponíveis nesta data." },
]

export const errorsData: Array<IError> = [
    ...loginErrorsData,
    ...serviceErrorsData,
    ...providersErrorsData,
    ...payedExpenseRecordsErrorsData,
    ...validExpenseRecordsErrorsData,
    ...notPayedExpenseRecordsErrorsData,
    ...indicatorsErrorsData
]