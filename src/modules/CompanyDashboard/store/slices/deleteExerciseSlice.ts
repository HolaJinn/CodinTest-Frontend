import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { deleteExerciseService } from "../../services/dashboardServices";

interface IDeleteExerciseState {
    isDeleting: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
}

const initialState: IDeleteExerciseState = {
    isDeleting: false,
    success: false,
    error: false,
    errorMessage: "",
}

export const deleteExercise = createAsyncThunk(
    "exercise/delete",
    async(id: string, thunkAPI) => {
        try{
            return await deleteExerciseService(id)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const deleteExerciseSlice: Slice = createSlice({
    name: "deleteExercise",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteExercise.pending, (state) => {
            state.isDeleting = true
            state.success = false
            state.error = false
            state.errorMessage = ""
        })

        builder.addCase(deleteExercise.fulfilled, (state, action: any) => {
            state.isDeleting = false
            state.success = true
            state.error = false
            state.errorMessage = ""
        })
        builder.addCase(deleteExercise.rejected, (state, action: any) => {
            state.isDeleting = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
        })
    }
})

export default deleteExerciseSlice.reducer