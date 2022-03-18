import { IRegistrationPayload } from './../model/index';
import * as apiUrl from './../../../utils/constants';
import axiosClient from "../../../api/axiosClient";

export const loginService = async (request: any) => {
    const url = apiUrl.LOGIN_USER_ENDPOINT
    const response = await axiosClient.post(url, request)
    return response
}

export const registerService = async (request: IRegistrationPayload) => {
    const url = apiUrl.REGISTER_USER_ENDPOINT
    const response = await axiosClient.post(url, request)
    return response
}