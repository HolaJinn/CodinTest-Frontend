import { IUser } from './../../../../models/User';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { getRecruitersService } from './../../services/dashboardServices';

interface IFetchRecruitersState {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    recruitersList: IUser[]
}

const initialState: IFetchRecruitersState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    recruitersList: []
}

export const fetchRecruiters = createAsyncThunk(
    "recruiters/fetch",
    async(filterOptions: Record<string, string>, thunkAPI) => {
        try{
            return await getRecruitersService(filterOptions)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchRecruitersSlice: Slice = createSlice({
    name: "fetchRecruiters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRecruiters.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.recruitersList = []
        })

        builder.addCase(fetchRecruiters.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.recruitersList = action.payload.data
        })
        builder.addCase(fetchRecruiters.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.recruitersList = []
        })
    }
})

export default fetchRecruitersSlice.reducer