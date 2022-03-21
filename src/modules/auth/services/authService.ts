import { IRegistrationPayload, IOwnerRegistrationPayload } from './../model/index';
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

export const registerOwnerService = async (request: IOwnerRegistrationPayload) => {
    const url = apiUrl.REGISTER_OWNER_ENDPOINT
    const response = await axiosClient.post(url, request)
    return response
}

export const verifyEmailService = async (code:string | null) => {
    const url = apiUrl.VERIFY_EMAIL_ENDPOINT
    return await axiosClient.get(url, {params: {code:code}})
}

export const sendResetPasswordToken = async(request: any) => {
    const url = apiUrl.SEND_RESET_PASSWORD_TOKEN_ENDPOINT
    return await axiosClient.post(url, request)
}

export const resetPasswordService = async(request: any, token: string) => {
    console.log("REQUEST",request)
    console.log("TOKEN",token)
    const url = apiUrl.RESET_PASSWORD_ENDPOINT
    return await axiosClient.post(url, request, {params: {token}})
}