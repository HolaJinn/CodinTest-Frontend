import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { acceptInvitationService } from './../../services/candidateServices';

interface IAcceptInvitationState {
    success: boolean,
    error: boolean,
    errorMessage: string
}

const initialState: IAcceptInvitationState = {
    success: false,
    error: false,
    errorMessage: ""
}

export const acceptInvitation = createAsyncThunk(
    "invitation/accept",
    async(invitationId: number, thunkAPI) => {
        try{
            return await acceptInvitationService(invitationId)
        } catch(error: any) {
            console.log(error)
            thunkAPI.rejectWithValue(error)
        }
    }
)

const acceptInvitationSlice: Slice = createSlice({
    name: "acceptInvitation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(acceptInvitation.pending, (state) => {
            state.success = false
            state.error = false
            state.errorMessage = ""
        })

        builder.addCase(acceptInvitation.fulfilled, (state, action: any) => {
            state.success = true
            state.error = false
            state.errorMessage = "You accepeted this invitation"
        })
        builder.addCase(acceptInvitation.rejected, (state, action: any) => {
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
        })
    }
})

export default acceptInvitationSlice.reducer