import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { Exercise } from "../../../../models/Exercise";
import { getExerciseDetailsService } from "../../services/dashboardServices";

interface IFetchExerciseDetailsState {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    exerciseDetails: Exercise
}

const initialState: IFetchExerciseDetailsState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    exerciseDetails: {} as Exercise
}

export const fetchExerciseDetails = createAsyncThunk(
    "exerciseDetails/fetch",
    async(exerciseId: string, thunkAPI) => {
        try{
            return await getExerciseDetailsService(exerciseId)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchExerciseDetailsSlice: Slice = createSlice({
    name: "fetchExerciseDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchExerciseDetails.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.exerciseDetails = {} as Exercise
        })

        builder.addCase(fetchExerciseDetails.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.exerciseDetails = action.payload.data
        })
        builder.addCase(fetchExerciseDetails.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.exerciseDetails = {} as Exercise
        })
    }
})

export default fetchExerciseDetailsSlice.reducer