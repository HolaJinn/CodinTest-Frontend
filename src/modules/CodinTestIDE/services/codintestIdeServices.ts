import * as apiUrl from "../../../utils/constants";
import axiosClient from "../../../api/axiosClient";
import { IAnswerSubmission } from "../models";

const token = localStorage.getItem("token")


export const executeCodeService = async (answerSubmission: IAnswerSubmission) => {
    const url = apiUrl.SUBMIT_CODE_ENDPOINT + "/" + answerSubmission.exerciseId;
    const request = {
        code: answerSubmission.code,
        programmingLanguage: answerSubmission.programmingLanguage
    }
    const response = await axiosClient.post(url, request,{
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return response
}   