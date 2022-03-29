import { Exercise } from './../../../../models/Exercise';
import { createExerciseService } from './../../services/dashboardServices';
import { IExerciseRequest } from './../../models/index';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

interface ICreateExerciseState {
    isCreating: boolean,
    success: boolean,
    error: boolean,
    message: string
    exercise?: Exercise
}

const initialState: ICreateExerciseState = {
    isCreating: false,
    success: false,
    error: false,
    message: "",
    exercise: undefined
}

export const createExercise = createAsyncThunk(
    "exercise/create",
    async(exerciseRequest: IExerciseRequest, thunkAPI) => {
        try {
            const reponse = await createExerciseService(exerciseRequest)
            return reponse
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const createExerciseSlice: Slice = createSlice({
    name: "createExercise",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createExercise.pending, (state) => {
            state.isCreating = true
            state.success = false
            state.error = false
            state.message = ""
        })
        builder.addCase(createExercise.fulfilled, (state, action: any) => {
            state.isCreating = false
            state.success = true
            state.error = false
            state.message = "New exercise is created"
            state.exercise = action.payload.data
        })
        builder.addCase(createExercise.rejected, (state, action: any) => {
            state.isCreating = false
            state.success = false
            state.error = true
            state.message = action.payload.data
            state.exercise = undefined
        })
    }
})

export default createExerciseSlice.reducer