import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL_ENDPOINT } from "../utils/constants";

const axiosClient = axios.create({
    baseURL: BASE_URL_ENDPOINT,
    headers: {
        'Content-Type': 'application/json'
    }
})

//Request Interceptors
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
}, (error) => {
    // return Promise.reject(error.response.data)
    return Promise.reject(error.response.data)
})

//Response Interceptor
axiosClient.interceptors.response.use((response: AxiosResponse) => {
    return response
}, (error) => {
    return Promise.reject(error.response.data)
})

export default axiosClient