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