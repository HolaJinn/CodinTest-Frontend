import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { Invitation } from "../../../../models/Invitation";
import { getInvitationsService } from "../../services/dashboardServices";


interface IFetchInvitationSSate {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    invitationsList: Invitation[]
}

const initialState: IFetchInvitationSSate = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    invitationsList: []
}

export const fetchInvitations = createAsyncThunk(
    "invitations/fetch",
    async(options: Record<string, string>, thunkAPI) => {
        try{
            return await getInvitationsService(options)
        } catch(error: any) {
            console.log(error)
            thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchInvitationsSlice: Slice = createSlice({
    name: "fetchInvitations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInvitations.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.invitationsList = []
        })

        builder.addCase(fetchInvitations.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.invitationsList = action.payload.data
        })
        builder.addCase(fetchInvitations.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.invitationsList = []
        })
    }
})

export default fetchInvitationsSlice.reducer