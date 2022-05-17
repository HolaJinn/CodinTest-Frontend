import { Invitation } from './../../../../models/Invitation';
import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { getCurrentUserInvitationsService } from '../../services/candidateServices';


interface IFetchCurrentUserInvitationsState {
    isFetching: boolean,
    success: boolean,
    error: boolean,
    errorMessage: string,
    invitationsList: Invitation[]
}

const initialState: IFetchCurrentUserInvitationsState = {
    isFetching: false,
    success: false,
    error: false,
    errorMessage: "",
    invitationsList: []
}

export const fetchCurrentUserInvitations = createAsyncThunk(
    "currentUserInvitations/fetch",
    async(options: Record<string, string>, thunkAPI) => {
        try{
            return await getCurrentUserInvitationsService(options)
        } catch(error: any) {
            console.log(error)
            thunkAPI.rejectWithValue(error)
        }
    }
)

const fetchCurrentUserInvitationsSlice: Slice = createSlice({
    name: "fetchCurrentUserInvitations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUserInvitations.pending, (state) => {
            state.isFetching = true
            state.success = false
            state.error = false
            state.errorMessage = ""
            state.invitationsList = []
        })

        builder.addCase(fetchCurrentUserInvitations.fulfilled, (state, action: any) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.errorMessage = ""
            state.invitationsList = action.payload.data
        })
        builder.addCase(fetchCurrentUserInvitations.rejected, (state, action: any) => {
            state.isFetching = false
            state.success = false
            state.error = true
            state.errorMessage = action.payload.data
            state.invitationsList = []
        })
    }
})

export default fetchCurrentUserInvitationsSlice.reducer