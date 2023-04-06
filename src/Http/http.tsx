import axios, { InternalAxiosRequestConfig } from "axios";
import { BASEURLCORE, BASEURLPROVIDER } from "Components/Envs/envs";

let HTTP_TOKEN: string | null = null;
export function setHttpToken(token: string | null) {
    HTTP_TOKEN = token;
}

export const httpCore = axios.create({
    baseURL: BASEURLCORE,
})

export const httpProvider = axios.create({
    baseURL: BASEURLPROVIDER,
})

function onRequest(response: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
    if(HTTP_TOKEN && response.headers) {
        const newResponse: any = response;
        newResponse.headers.Authorization = `Token ${HTTP_TOKEN}`;
        return newResponse;
    }
    return response;
}

function onRequestError(error: any): Promise<any> {
    return Promise.reject(error);
}
httpCore.interceptors.request.use(onRequest, onRequestError);
httpProvider.interceptors.request.use(onRequest, onRequestError);