import { TestCase } from './../../../../models/TestCase';
import { createTestCaseService } from './../../services/dashboardServices';
import { ITestCaseRequest } from './../../models/index';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

interface ICreateTestCaseState {
    isCreating: boolean,
    success: boolean,
    error: boolean,
    message: string,
    testCase?: TestCase
}

const initialState: ICreateTestCaseState = {
    isCreating: false,
    success: false,
    error: false,
    message: "",
    testCase: undefined
}

export const createTestCase = createAsyncThunk(
    "testCase/create",
    async(testCaseRequest: ITestCaseRequest, thunkAPI) => {
        try{
            const response = await createTestCaseService(testCaseRequest)
            return response
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const createTestCaseSlice: Slice = createSlice({
    name: "createTestCase",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTestCase.pending, (state) => {
            state.isCreating = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(createTestCase.fulfilled, (state, action: any) => {
            state.isCreating = false
            state.success = true
            state.error = false
            state.message = "New test case is added"
            state.testCase = action.payload.data
        })
        builder.addCase(createTestCase.rejected, (state, action: any) => {
            state.isCreating = false
            state.success = false
            state.error = true
            state.message = action.payload.data
            state.testCase = undefined
        })
    }
})

export default createTestCaseSlice.reducer