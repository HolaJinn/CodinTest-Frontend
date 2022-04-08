import { IAddExercisesToTechnicalTest } from './../../models/index';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { addExercisesToTechnicalTestService } from '../../services/dashboardServices';

interface IAddExercisesToTechnicalTestState {
    isAdding: boolean;
    success: boolean;
    error: boolean;
    message: string;
}

const initialState: IAddExercisesToTechnicalTestState = {
    isAdding: false,
    success: false,
    error: false,
    message: ""
}

export const addExercisesToTechnicalTest = createAsyncThunk(
    "technicalTest/addExercises",
    async(addExercisesToTechnicalTestRequest: IAddExercisesToTechnicalTest, thunkAPI) => {
        try {
            const response = await addExercisesToTechnicalTestService(addExercisesToTechnicalTestRequest)
            return response
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const addExercisesToTechnicalTestSlice: Slice = createSlice({
    name: "addExercisesToTechnicalTest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addExercisesToTechnicalTest.pending, (state) => {
            state.isAdding = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(addExercisesToTechnicalTest.fulfilled, (state, action: any) => {
            state.isAdding = false
            state.success = true
            state.error = false
            state.message = "Exercises are added to the technical test"
        })
        builder.addCase(addExercisesToTechnicalTest.rejected, (state, action: any) => {
            state.isAdding = false
            state.success = false
            state.error = true
            state.message = action.payload.data
        })
    }
})

export default addExercisesToTechnicalTestSlice.reducer