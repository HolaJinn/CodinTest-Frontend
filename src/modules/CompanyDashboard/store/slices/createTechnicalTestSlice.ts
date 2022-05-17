import { ITechnicalTestRequest } from './../../models/index';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { TechnicalTest } from "../../../../models/TechnicalTest";
import { createTechnicalTestService } from '../../services/dashboardServices';

interface ICreateTechnicalTestState {
    isCreating: boolean,
    success: boolean,
    error: boolean,
    message: string,
    technicalTest?: TechnicalTest
}

const initialState: ICreateTechnicalTestState = {
    isCreating: false,
    success: false,
    error: false, 
    message: "",
    technicalTest: undefined
}

export const createTechnicalTest = createAsyncThunk(
    "technicalTest/create",
    async(technicalTestRequest: ITechnicalTestRequest, thunkAPI) => {
        try {   
            const response = await createTechnicalTestService(technicalTestRequest)
            return response
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const createTechnicalTestSlice: Slice = createSlice({
    name: "createTechnicalTest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTechnicalTest.pending, (state) => {
            state.isCreating = true
            state.success = false
            state.error = false
            state.message = ""
            state.technicalTest = undefined
        })
        builder.addCase(createTechnicalTest.fulfilled, (state, action: any) => {
            state.isCreating = false
            state.success = true
            state.error = false
            state.message = "New technical test is created"
            state.technicalTest = action.payload.data
        })
        builder.addCase(createTechnicalTest.rejected, (state, action: any) => {
            state.isCreating = false
            state.success = false
            state.error = true
            state.message = action.payload.data
            state.technicalTest = undefined
        })
    }
})

export default createTechnicalTestSlice.reducer