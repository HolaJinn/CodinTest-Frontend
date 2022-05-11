import { IExerciseRequest, ITestCaseRequest, IInitialCodeRequest, ITechnicalTestRequest, IAddExercisesToTechnicalTest, IInvitationRequest, IRecruiterRegisterRequest } from './../models/index';
import * as apiUrl from "../../../utils/constants"
import axiosClient from '../../../api/axiosClient';

const token = localStorage.getItem("token")

export const createExerciseService = async (requset: IExerciseRequest) => {
    const url = apiUrl.EXERCISE_ENDPOINT
    const response = await axiosClient.post(url, requset, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response;
}

export const getExercisesService = async(filterOptions: Record<string, string> ) => {
    const url = apiUrl.EXERCISE_ENDPOINT
    return await axiosClient.get(url, {
        params: filterOptions,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const createInitialCodeService = async(request: IInitialCodeRequest) => {
    const url = apiUrl.INITIAL_CODE_ENDPOINT
    const response = await axiosClient.post(url, request, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export const createTestCaseService = async(request: ITestCaseRequest) => {
    const url = apiUrl.TEST_CASE_ENDPOINT
    const response = await axiosClient.post(url, request, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export const getAllTagsService = async() => {
    const url = apiUrl.TAGS_ENDPOINT
    return await axiosClient.get(url); 
}

export const getAllProgrammingLanguagesService = async() => {
    const url = apiUrl.PROGRAMMING_LANGUAGES_ENDPOINT
    return await axiosClient.get(url)
}

export const getExerciseDetailsService = async(id: string) => {
    const url = apiUrl.EXERCISE_ENDPOINT + "/" + id
    return await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const deleteExerciseService = async(id: string) => {
    const url = apiUrl.EXERCISE_ENDPOINT + "/" + id;
    return await axiosClient.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const createTechnicalTestService = async (requset: ITechnicalTestRequest) => {
    const url = apiUrl.TECHNICAL_TEST_ENDPOINT
    const response = await axiosClient.post(url, requset, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response;
}

export const getTechnicalTestsService = async (options: Record<string, string>) => {
    const url = apiUrl.TECHNICAL_TEST_ENDPOINT
    return await axiosClient.get(url, {
        params: options,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getTechnicalTestDetailsService = async (id: number) => {
    const url = apiUrl.TECHNICAL_TEST_ENDPOINT + "/" + id
    return await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const addExercisesToTechnicalTestService = async(request: IAddExercisesToTechnicalTest) => {
    const url = apiUrl.TECHNICAL_TEST_ENDPOINT + "/exercises"
    const response = await axiosClient.post(url, request, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export const deleteTechnicalTestService = async(id: number) => {
    const url = apiUrl.TECHNICAL_TEST_ENDPOINT + "/" + id;
    return await axiosClient.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const createInvitationService = async(request: IInvitationRequest) => {
    const url = apiUrl.INVITATION_ENDPOINT
    const response = await axiosClient.post(url, request, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export const getInvitationsService = async(options: Record<string, string>) => {
    const url = apiUrl.INVITATION_ENDPOINT
    return await axiosClient.get(url, {
        params: options,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getInvitationDetailsService = async(id: string) => {
    const url = apiUrl.INVITATION_ENDPOINT + "/" + id
    return await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getRelatedCandidatesService = async(options: Record<string, string>) => {
    const url = apiUrl.RELATED_CANDIDATES_ENDPOINT
    return await axiosClient.get(url, {
        params: options,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getRecruitersService = async(options: Record<string, string>) => {
    const url = apiUrl.RECRUITER_ENDPOINT
    return await axiosClient.get(url, {
        params: options,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const addRecruiterService = async (request: IRecruiterRegisterRequest) => {
    const url = apiUrl.ADD_RECRUITER_ENDPOINT
    const response = await axiosClient.post(url, request, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}