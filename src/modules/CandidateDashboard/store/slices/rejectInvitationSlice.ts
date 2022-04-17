import { rejectInvitationService } from './../../services/candidateServices';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

interface IRejectInvitationState {
    success: boolean;
    error: boolean;
    errorMessage: string;
}

const initialState: IRejectInvitationState = {
    success: false,
    error: false,
    errorMessage: ""
};

export const rejectInvitation = createAsyncThunk(
    "invitation/reject",
    async(invitationId: number, thunkAPI) => {
        try {
            return await rejectInvitationService(invitationId)
        } catch (error) {
            console.log(error)
            thunkAPI.rejectWithValue(error)
        }
    }
);

const rejectInvitationSlice: Slice = createSlice({
    name: "rejectInvitation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(rejectInvitation.pending, (state) => {
            state.success = false
            state.error = false
            state.errorMessage = ""
        });

        builder.addCase(rejectInvitation.fulfilled, (state, action: any) => {
            state.success = true
            state.error = false
            state.errorMessage = "You rejected this invitation"
        });
        builder.addCase(rejectInvitation.rejected, (state, action: any) => {
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
        });
    }
});

export default rejectInvitationSlice.reducer