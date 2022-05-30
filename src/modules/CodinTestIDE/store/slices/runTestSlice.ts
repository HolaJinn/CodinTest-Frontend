import { ExecutionResult } from '../../../../models/ExecutionResult';
import { runTestService } from './../../services/codintestIdeServices';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { IAnswerSubmission } from "../../models";

interface IRunTestState {
    isExecuting: boolean,
    success: boolean,
    error: boolean,
    message: string
    executionResult?: ExecutionResult[]
}

const initialState: IRunTestState = {
    isExecuting: false,
    success: false,
    error: false,
    message: "",
    executionResult: undefined
}

export const runTest = createAsyncThunk(
    "runTest/execute",
    async(answerSubmission: IAnswerSubmission, thunkAPI) => {
        try {
            const response = await runTestService(answerSubmission)
            return response
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const runTestSlice: Slice = createSlice({
    name: "executeCode",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(runTest.pending, (state) => {
            state.isExecuting = true
            state.success = false
            state.error = false
            state.message = ""
            state.executionResult = undefined
        })
        builder.addCase(runTest.fulfilled, (state, action: any) => {
            state.isExecuting = false
            state.success = true
            state.error = false
            state.message = "Execution is completed"
            state.executionResult = action.payload.data
        })
        builder.addCase(runTest.rejected, (state, action: any) => {
            state.isExecuting = false
            state.success = false
            state.error = true
            state.message = action.payload.data
            state.executionResult = undefined
        })
    }
})

export default runTestSlice.reducer