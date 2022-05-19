import { executeCodeService } from './../../services/codintestIdeServices';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { IAnswerSubmission } from "../../models";

interface IExecuteCodeState {
    isExecuting: boolean,
    success: boolean,
    error: boolean,
    message: string
    executionResult?: any
}

const initialState: IExecuteCodeState = {
    isExecuting: false,
    success: false,
    error: false,
    message: "",
    executionResult: undefined
}

export const executeCode = createAsyncThunk(
    "executeCode/execute",
    async(answerSubmittion: IAnswerSubmission, thunkAPI) => {
        try {
            const reponse = await executeCodeService(answerSubmittion)
            return reponse
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const executeCodeSlice: Slice = createSlice({
    name: "executeCode",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(executeCode.pending, (state) => {
            state.isExecuting = true
            state.success = false
            state.error = false
            state.message = ""
            state.executionResult = undefined
        })
        builder.addCase(executeCode.fulfilled, (state, action: any) => {
            state.isExecuting = false
            state.success = true
            state.error = false
            state.message = "Execution is completed"
            state.executionResult = action.payload.data
        })
        builder.addCase(executeCode.rejected, (state, action: any) => {
            state.isExecuting = false
            state.success = false
            state.error = true
            state.message = action.payload.data
            state.executionResult = undefined
        })
    }
})

export default executeCodeSlice.reducer