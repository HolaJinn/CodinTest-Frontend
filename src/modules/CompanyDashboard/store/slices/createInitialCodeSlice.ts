import { createInitialCodeService } from './../../services/dashboardServices';
import { IInitialCodeRequest } from './../../models/index';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

interface ICreateInitialCodeState {
    isCreating: boolean,
    success: boolean,
    error: boolean,
    message: string
}

const initialState: ICreateInitialCodeState = {
    isCreating: false,
    success: false,
    error: false,
    message: ""
}

export const createInitialCode = createAsyncThunk(
    "initialCode/create",
    async(initialCodeRequest: IInitialCodeRequest, thunkAPI) => {
        try {
            const response = await createInitialCodeService(initialCodeRequest)
            return response
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const createInitialCodeSlice: Slice = createSlice({
    name: "createInitialCode",
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createInitialCode.pending, (state) => {
            state.isCreating = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(createInitialCode.fulfilled, (state) => {
            state.isCreating = false
            state.success = true
            state.error = false
            state.message = "Initial code is added to the exercise"
        })
        builder.addCase(createInitialCode.rejected, (state, action: any) => {
            state.isCreating = false
            state.success = false
            state.error = true
            state.message = action.payload.data
        })
    }
})

export default createInitialCodeSlice.reducer