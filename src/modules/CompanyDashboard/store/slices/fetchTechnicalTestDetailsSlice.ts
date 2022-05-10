import { TechnicalTest } from './../../../../models/TechnicalTest';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { getTechnicalTestDetailsService } from '../../services/dashboardServices';

interface IFetchTechnicalTestDetailsState {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    technicalTestDetails: TechnicalTest
}

const initialState: IFetchTechnicalTestDetailsState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    technicalTestDetails: {} as TechnicalTest
}

export const fetchTechnicalTestDetails = createAsyncThunk(
    "technicalTestDetails/fetch",
    async(technicalTestId: number, thunkAPI) => {
        try{
            return await getTechnicalTestDetailsService(technicalTestId)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchTechnicalTestDetailsSlice: Slice = createSlice({
    name: "fetchTechnicalTestDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTechnicalTestDetails.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.technicalTestDetails = {} as TechnicalTest
        })
        builder.addCase(fetchTechnicalTestDetails.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.technicalTestDetails = action.payload.data
        })
        builder.addCase(fetchTechnicalTestDetails.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.technicalTestDetails = {} as TechnicalTest
        })
    }
})

export default fetchTechnicalTestDetailsSlice.reducer;