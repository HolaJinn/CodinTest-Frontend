import { getExercisesService } from './../../services/dashboardServices';
import { Exercise } from './../../../../models/Exercise';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

interface IFetchExerciseState {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    exercisesList: Exercise[]
}

const initialState: IFetchExerciseState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    exercisesList: []
}

export const fetchExercises = createAsyncThunk(
    "exercise/fetch",
    async(options: Record<string, string>, thunkAPI) => {
        try{
            return await getExercisesService(options)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchExercisesSlice: Slice = createSlice({
    name: "fetchExercises",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchExercises.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.exercisesList = []
        })

        builder.addCase(fetchExercises.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.exercisesList = action.payload.data
        })
        builder.addCase(fetchExercises.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.exercisesList = []
        })
    }
})

export default fetchExercisesSlice.reducer