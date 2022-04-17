import * as apiUrl from "../../../utils/constants";
import axiosClient from "../../../api/axiosClient";

const token = localStorage.getItem("token")

export const getCurrentUserInvitationsService = async (options: Record<string, string>) => {
    const url = apiUrl.CURRENT_USER_INVITATIONS_ENDPOINT
    const response = await axiosClient.get(url, {
        params: options, 
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export const acceptInvitationService = async (invitationId: number) => {
    const url = apiUrl.ACCEPT_INVITATION_ENDPOINT + "/" + invitationId
    //Empty object is passed as body because the post request is expecting a body but I don't have one
    const response = await axiosClient.post(url, {},{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export const rejectInvitationService = async (invitationId: number) => {
    const url = apiUrl.REJECT_INVITATION_ENDPOINT + "/" + invitationId
    const response = await axiosClient.post(url, {},{
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return response
}