import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { deleteTechnicalTestService } from "../../services/dashboardServices";

interface IDeleteTechnicalTestState {
    isDeleting: boolean;
    success: boolean;
    error: boolean;
    errorMessage: string;
}

const initialState: IDeleteTechnicalTestState = {
    isDeleting: false,
    success: false,
    error: false,
    errorMessage: "",
}

export const deleteTechnicalTest = createAsyncThunk(
    "technicalTest/delete",
    async(id: number, thunkAPI) => {
        try{
            return await deleteTechnicalTestService(id)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const deleteTechnicalTestSlice: Slice = createSlice({
    name: "deleteTechnicalTest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {  
        builder.addCase(deleteTechnicalTest.pending, (state) => {
            state.isDeleting = true
            state.success = false
            state.error = false
            state.errorMessage = ""
        })

        builder.addCase(deleteTechnicalTest.fulfilled, (state, action: any) => {
            state.isDeleting = false
            state.success = true
            state.error = false
            state.errorMessage = ""
        })
        builder.addCase(deleteTechnicalTest.rejected, (state, action: any) => {
            state.isDeleting = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
        })
    }
})

export default deleteTechnicalTestSlice.reducer