import { IUser } from './../../../../models/User';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { getRelatedCandidatesService } from '../../services/dashboardServices';

interface IFetchRelatedCandidatesState {
    isFetching: boolean;
    success: boolean;
    error: boolean;
    errorMessage: string;
    relatedCandidatesList: IUser[];
}

const initialState: IFetchRelatedCandidatesState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    relatedCandidatesList: []
};

export const fetchRelatedCandiates = createAsyncThunk(
    "relatedCandidates/fetch",
    async(options: Record<string, string>, thunkAPI) => {
        try{
            return await getRelatedCandidatesService(options)
        } catch(error: any) {
            console.log(error)
            thunkAPI.rejectWithValue(error)
        }
    }
);

const fetchRelatedCandidatesSlice: Slice = createSlice({
    name: "fetchRelatedCandidates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedCandiates.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.relatedCandidatesList = []
        });

        builder.addCase(fetchRelatedCandiates.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.relatedCandidatesList = action.payload.data
        });
        builder.addCase(fetchRelatedCandiates.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.relatedCandidatesList = []
        });
    }
});

export default fetchRelatedCandidatesSlice.reducer;