import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { resetPasswordService } from "../../services/authService";

interface IVerificationState {
    verifiying: boolean
    success: boolean
    error: boolean
    message: string
}

const initialState: IVerificationState = {
    verifiying: false,
    success: false,
    error: false,
    message: ""
}

export const reset = createAsyncThunk(
    "/auth/reset-password",
    async(request: any, thunkAPI) => {
        try {
            const response = await resetPasswordService(request.newPasswordRequest, request.token)
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetPasswordSlice: Slice = createSlice({
    name:"resetPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reset.pending, (state) => {
            state.verifiying = true
            state.success = false;
            state.error = false;
            state.message = ""
        })
        builder.addCase(reset.fulfilled, (state) => {
            state.verifiying = false
            state.success = true;
            state.error = false;
            state.message = "Your password is reseted successfully"
        })
        builder.addCase(reset.rejected, (state, action: any) => {
            state.verifiying = false
            state.success = false;
            state.error = true;
            state.message = action.payload.message
        })
    }
})

export const resetPasswordActions = resetPasswordSlice.actions
export default resetPasswordSlice.reducer