import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { TechnicalTest } from "../../../../models/TechnicalTest";
import { getTechnicalTestsService } from "../../services/dashboardServices";

interface IFetchTechnicalTestState {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    technicalTestsList: TechnicalTest[]
}

const initialState: IFetchTechnicalTestState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    technicalTestsList: []
}

export const fetchTechnicalTests = createAsyncThunk(
    "technicalTest/fetch",
    async(options: Record<string, string>, thunkAPI) => {
        try{
            return await getTechnicalTestsService(options)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchTechnicalTestsSlice: Slice = createSlice({
    name: "fetchTechnicalTests",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTechnicalTests.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.technicalTestsList = []
        })

        builder.addCase(fetchTechnicalTests.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.technicalTestsList = action.payload.data
        })
        builder.addCase(fetchTechnicalTests.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.technicalTestsList = []
        })
    }
})

export default fetchTechnicalTestsSlice.reducer