import { IExerciseRequest, ITestCaseRequest } from './../models/index';
import * as apiUrl from "../../../utils/constants"
import axiosClient from '../../../api/axiosClient';

const token = localStorage.getItem("token")

export const createExerciseService = async (requset: IExerciseRequest) => {
    const url = apiUrl.CREATE_EXERCISE_ENDPOINT
    const response = await axiosClient.post(url, requset, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response;
}

export const createTestCaseService = async(request: ITestCaseRequest) => {
    const url = apiUrl.CREATE_TEST_CASE_ENDPOINT
    const response = await axiosClient.post(url, request, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}