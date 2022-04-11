import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { IInvitationRequest } from "../../models";
import { createInvitationService } from "../../services/dashboardServices";


interface ICreateInvitationState {
    isCreating: boolean,
    success: boolean,
    error: boolean,
    message: string
}

const initialState: ICreateInvitationState = {
    isCreating: false,
    success: false,
    error: false,
    message: ""
}

export const createInvitation = createAsyncThunk(
    "invitation/create",
    async(invitationRequest: IInvitationRequest, thunkAPI) => {
        try {
            const reponse = await createInvitationService(invitationRequest)
            return reponse
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const createInvitationSlice: Slice = createSlice({
    name: "createInvitation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createInvitation.pending, (state) => {
            state.isCreating = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(createInvitation.fulfilled, (state, action: any) => {
            state.isCreating = false
            state.success = true
            state.error = false
            state.message = "New invitation is sent to the candidate"
        })
        builder.addCase(createInvitation.rejected, (state, action: any) => {
            state.isCreating = false
            state.success = false
            state.error = true
            state.message = action.payload.data
        })
    }
})

export default createInvitationSlice.reducer