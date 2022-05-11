import { Invitation } from './../../../../models/Invitation';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { getInvitationDetailsService } from '../../services/dashboardServices';

interface IFetchInvitationDetailsState {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    invitationDetails: Invitation
}

const initialState: IFetchInvitationDetailsState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    invitationDetails: {} as Invitation
}

export const fetchInvitationDetails = createAsyncThunk(
    "invitationDetails/fetch",
    async(invitationId: string, thunkAPI) => {
        try{
            return await getInvitationDetailsService(invitationId)
        } catch(error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchInvitationDetailsSlice: Slice = createSlice({
    name: "fetchInvitationDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInvitationDetails.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.invitationDetails = {} as Invitation
        })
        builder.addCase(fetchInvitationDetails.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.invitationDetails = action.payload.data
        })
        builder.addCase(fetchInvitationDetails.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.invitationDetails = {} as Invitation
        })
    }
})

export default fetchInvitationDetailsSlice.reducer;